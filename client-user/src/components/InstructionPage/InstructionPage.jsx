import { useDispatch, useSelector } from "react-redux";
import "./InstructionPage.css";
import { RxCross1 } from "react-icons/rx";
import { setIsInstructionPage } from "../../Slices/orderSlice";

const InstructionPage = ({ instructions, setInstructions }) => {
  const { orderItems } = useSelector((store) => store.orders);

  const dispatch = useDispatch();
  const handleAddInstructions = () => {
    dispatch(setIsInstructionPage(false));
  };
  return (
    <div className="instrucion-page-container">
      <h2>Add Cooking Instructions</h2>
      <div className="adding-instructions">
        <input
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          type="text"
        />
      </div>
      <p>
        The restaurant will try its best to follow your request. However,
        refunds or cancellations in this regard won’t be possible
      </p>
      <div className="cross-icon">
        <RxCross1
          size={"30px"}
          onClick={() => dispatch(setIsInstructionPage(false))}
        />
      </div>

      <div className="instruction-page-btn-container">
        <button
          onClick={() => dispatch(setIsInstructionPage(false))}
          className="cancel-btn"
        >
          Cancel
        </button>
        <button
          onClick={handleAddInstructions}
          className="instructions-next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default InstructionPage;
