# 🍽️ Restaurant Management Dashboard (MERN Stack)

A complete restaurant management system built with the MERN stack, offering seamless tracking of analytics, tables, orders, menu, and POS operations via a responsive and intuitive dashboard.

## 🚀 Live Demo
**Frontend (Vercel)**:(client - user) [https://restaurant-management-user.app](https://restaurant-management-user.vercel.app/) ** mobile version **  
**Frontend (Vercel)**:(client - admin) [https://restaurant-management-admin.app](https://restaurant-management-lyart-seven.vercel.app/) 

---

## 🧰 Tech Stack
- **Frontend**: React.js, Tailwind CSS, Redux (optional), Chart.js/Recharts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 📊 Dashboard Analytics

### 🔑 Key Metrics Overview
- **Total Chefs**
- **Total Revenue** (e.g., ₹12K)
- **Total Orders**
- **Total Clients** (e.g., 65)

### 📈 Charts & Graphs
- **Daily Revenue Chart** (Mon to Sun)
- **Order Summary Pie Chart**
  - Dine In %
  - Take Away %
  - Served %

---

## 🪑 Table Management

### 📋 Table Status Dashboard
- **Tables**: ID from 01 to 30+
- **Status**: Reserved / Available
- **Chair Count**: View and update seat capacity

### ✏️ Table CRUD Operations
- Add custom-named tables
- Set number of chairs
- Toggle Reserved/Available status

### 🔍 Search & Filter
- Search by table number or availability status

---

## 🧾 Order Management

### 🛒 Order Types
- **Dine In**
- **Take Away**

### 📦 Order Status
- Processing
- Done
- Served
- Not Picked Up

### 📄 Order Details
- Order ID, Timestamp (e.g., 9:37 AM)
- Table ID (e.g., Table-05)
- Item Count (e.g., 3 Items)
- Ongoing Timer (e.g., 4 min)
- Cooking Instructions (optional)

### 🔁 Repeat Orders
- Quick re-order functionality with saved layouts

---

## 🧆 Menu Management

### 📁 Categories
- Drink, Burger, Pizza, French Fries, Veggies

### 🍕 Item Cards
- Name, Price (e.g., Marinara ₹200)
- Add/Remove from cart
- Swipe-to-order (Mobile-friendly)

### 🛍️ Cart Features
- Item Total, Delivery Charge, Taxes
- **Grand Total**
- Order Placement: Dine In / Take Away

---

## 💳 Checkout & Delivery

### 👤 Customer Details
- Name, Phone Number
- Delivery Address

### ⏱️ Estimated Time
- Display estimated delivery time (e.g., 42 mins)

### 📜 Cooking Instructions
- Free-text field for special requests
- ❗**Disclaimer**: No refunds for unmet custom instructions

---

## 👨‍🍳 Chef Order Assignment

### 🧑‍🍳 Chef List
- View all available chefs (e.g., Manesh, Pritam, Yash, Tenzen)

### 📊 Orders Taken
- Number of active orders each chef is managing

---

## 🔎 Global Search & Filter

- Search tables, orders, menu items
- Use filter panels for:
  - Analytics
  - Table Availability
  - Order Type

---

## 🖥️ POS Touch UI

### ⌨️ Touch-friendly Interface
- On-screen keyboard input
- Cart always visible
- “Next” button to proceed with order

---

## 🛠️ Installation & Setup

### 1. Clone the Repositories

- git clone https://github.com/lokeshgoud15/Restaurant-Management.git

'''
### 2. Frontend Setup

- cd client-user/client-admin
- npm install
- npm run dev


### 3. Backend Setup

- cd server
- npm install
- npm run dev

## 📌 Notes
- Mobile responsive for menu & ordering

- Highly interactive admin dashboard

- Optimized API structure for smooth data flow

- Focus on real-time updates and analytics

# 📜 License
This project is open source and available under the MIT License.

# 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

# 👨‍💻 Author
- Lokesh Nalamasa
- 📧 nlokeshgoud7@gmail.com
- 🌐 GitHub | LinkedIn
