import "./App.css";
import Item from "./components/Item";
import { useState } from "react";

function App() {
  let items0 = [
    {
      name: "apple",
      quantity: 0,
      id: 0,
      editState: false,
      deletedState: false,
    },
    {
      name: "pineapple",
      quantity: 3,
      id: 1,
      editState: false,
      deletedState: false,
    },
    {
      name: "pear",
      quantity: 10,
      id: 2,
      editState: false,
      deletedState: false,
    },
    {
      name: "apricot",
      quantity: 5,
      id: 3,
      editState: false,
      deletedState: true,
    },
  ];

  const [items, setItems] = useState(items0);
  const [showDeleted, setShowDeleted] = useState(false);
  const [newItemName, setNewItemN] = useState("");
  const [newItemQuantity, setNewItemQ] = useState(0);

  const handleNameChange = (event) => {
    setNewItemN(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setNewItemQ(event.target.value);
  };

  const addItem = (event) => {
    event.preventDefault();

    const newItem = {
      name: newItemName,
      quantity: newItemQuantity,
      editState: false,
      deletedState: false,
      id: Math.floor(Math.random() * 10000),
    };

    setItems(items.concat(newItem));
  };

  const toggleEdit = (id) => {
    const item = items.find((i) => i.id === id);
    const changedItem = { ...item, editState: !item.editState };
    setItems(items.map((i) => (i.id === id ? changedItem : i)));
  };

  const toggleDelete = (id) => {
    const item = items.find((i) => i.id === id);
    const changedItem = { ...item, deletedState: !item.deletedState };
    setItems(items.map((i) => (i.id === id ? changedItem : i)));
  };

  const handlePermanentDelete = (id) => {
    const item = items.find((i) => i.id === id);
    setItems(items.filter((i) => i.id !== item.id));
  };

  const itemsToShow = showDeleted
    ? items.filter((i) => i.deletedState)
    : items.filter((i) => !i.deletedState);

  return (
    <div>
      <h1>Inventory Tracker</h1>
      <h2>Add Item</h2>
      <form onSubmit={addItem}>
        <label htmlFor="item">Name</label>
        <input
          id="item"
          type="text"
          value={newItemName}
          onChange={handleNameChange}
        ></input>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          value={newItemQuantity}
          onChange={handleQuantityChange}
        ></input>
        <button type="submit">Add item</button>
      </form>
      <h2>Inventory</h2>
      <button onClick={() => setShowDeleted(!showDeleted)}>
        {showDeleted ? "Show all" : "Show deleted"}
      </button>
      <div className="table">
        <div className="tr">
          <span className="td">Name</span>
          <span className="td">Quantity</span>
          <span className="td">Options</span>
        </div>
        {itemsToShow.map((i) => {
          return (
            <Item
              name={i.name}
              quantity={i.quantity}
              id={i.id}
              key={i.id}
              editState={i.editState}
              deletedState={i.deletedState}
              toggleEdit={() => toggleEdit(i.id)}
              toggleDelete={() => toggleDelete(i.id)}
              handlePermanentDelete={() => handlePermanentDelete(i.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
