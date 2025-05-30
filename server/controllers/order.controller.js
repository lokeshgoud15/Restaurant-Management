import Order from "../models/order.model.js";
import Chef from "../models/chef.model.js";
import Table from "./../models/table.model.js";
import cron from "node-cron";

export const createOrder = async (req, res) => {
  const {
    customerDetails,
    Items,
    address,
    totalPrice,
    orderType,
    expectedCompletion,
    cookingInstructions,
    occupants,
  } = req.body;

  try {
    const chefs = await Chef.find().populate("ordersAssigned");

    let leastBusyChef = null;

    chefs.forEach((chef) => {
      if (chefs.every((c) => c.ordersAssigned.length === 0)) {
        leastBusyChef = chef;
      } else {
        const numOrders = chef.ordersAssigned.length;

        if (!leastBusyChef || numOrders < leastBusyChef.ordersAssigned.length) {
          leastBusyChef = chef;
        } else if (numOrders === leastBusyChef.ordersAssigned.length) {
          const chefLastOrderCompletion = chef.ordersAssigned.reduce(
            (soonest, order) => {
              const completionTime =
                new Date(order.createdAt).getTime() +
                parseInt(order.expectedCompletion) * 60000;
              return completionTime < soonest ? completionTime : soonest;
            },
            Infinity
          );

          const leastBusyChefLastOrderCompletion =
            leastBusyChef.ordersAssigned.reduce((soonest, order) => {
              const completionTime =
                new Date(order.createdAt).getTime() +
                parseInt(order.expectedCompletion) * 60000;
              return completionTime < soonest ? completionTime : soonest;
            }, Infinity);

          if (chefLastOrderCompletion < leastBusyChefLastOrderCompletion) {
            leastBusyChef = chef;
          }
        }
      }
    });

    let status = "processing";
    let assignedTo = leastBusyChef._id;
    let tableName = null;

    if (orderType === "dine in") {
      const tables = await Table.find({ isOccupied: false })
        .sort({ name: 1 })
        .collation({ locale: "en", numericOrdering: true });

      if (tables.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No available tables.",
        });
      }

      let assignedTables = [];
      let remainingOccupants = occupants;

      const singleTable = tables.find((table) => table.noOfSeats >= occupants);
      if (singleTable) {
        singleTable.isOccupied = true;
        await singleTable.save();
        tableName = [singleTable._id];
      } else {
        let totalCapacity = 0;

        for (const table of tables) {
          assignedTables.push(table);
          totalCapacity += table.noOfSeats;

          if (totalCapacity >= occupants) {
            break;
          }
        }

        if (totalCapacity < occupants) {
          return res.status(400).json({
            success: false,
            message: "Not enough table capacity to accommodate the occupants.",
          });
        }

        for (const table of assignedTables) {
          table.isOccupied = true;
          await table.save();
        }

        tableName = assignedTables.map((table) => table._id);
      }
    }

    let newOrder;

    if (orderType === "dine in") {
      newOrder = await Order.create({
        customerDetails,
        orderItems: Items,
        address,
        totalPrice,
        orderType,
        status,
        assignedTo,
        tableDetails: tableName,
        expectedCompletion,
        cookingInstructions,
        occupants,
      });
    } else {
      newOrder = await Order.create({
        customerDetails,
        orderItems: Items,
        address,
        totalPrice,
        orderType,
        status,
        assignedTo,
        expectedCompletion,
        cookingInstructions,
      });
    }

    leastBusyChef.ordersAssigned.push(newOrder._id);
    await leastBusyChef.save();

    res.status(200).json({
      success: true,
      saveOrder: newOrder,
      message: `Order created successfully${
        orderType === "dine in" ? " and tables assigned." : "."
      }`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, status, {
      new: true,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: "served" } });
    if (!orders || orders.length === 0) {
      return { success: true, message: "No orders to update." };
    }

    const currentTime = Date.now();

    for (const order of orders) {
      const orderCreatedAt = new Date(order.createdAt).getTime();
      const expectedCompletionTime = order.expectedCompletion * 60000;

      if (currentTime - orderCreatedAt >= expectedCompletionTime) {
        order.status = "served";
        await order.save();
        if (
          order.orderType === "dine in" &&
          order.tableDetails &&
          order.tableDetails.length > 0
        ) {
          for (const tableId of order.tableDetails) {
            const table = await Table.findById(tableId);
            if (table) {
              table.isOccupied = false;
              await table.save();
            }
          }
        }
      }
    }

    return { success: true, message: "Order status updated successfully." };
  } catch (error) {
    console.error("Error in updateOrdersLogic:", error.message);
    throw error;
  }
};
cron.schedule("* * * * *", () => {
  updateOrderStatus();
});
