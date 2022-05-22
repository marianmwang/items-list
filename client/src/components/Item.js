import { useState } from "react";

const Item = ({
  name,
  quantity,
  editState,
  deletedState,
  toggleEdit,
  toggleDelete,
  handlePermanentDelete,
}) => {
  const [curQuantity, setQuantity] = useState(quantity);

  const changeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const editLabel = editState ? "Save" : "Edit";
  const deleteLabel = deletedState ? "Undelete" : "Delete";

  return (
    <div className="tr">
      <span className="td">{name}</span>
      <span className="td">
        {editState ? (
          <input
            type="text"
            value={curQuantity}
            onChange={changeQuantity}
          ></input>
        ) : (
          curQuantity
        )}
      </span>
      <span className="td">
        <button onClick={toggleDelete}>{deleteLabel}</button>
        {deletedState ? (
          <button onClick={handlePermanentDelete}>Permanently Delete</button>
        ) : (
          <button onClick={toggleEdit}>{editLabel}</button>
        )}
      </span>
    </div>
  );
};

export default Item;
