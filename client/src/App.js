import "./App.css";
import Item from "./components/Item";
import itemService from "./services/items";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [newItemName, setNewItemN] = useState("");
  const [newItemQuantity, setNewItemQ] = useState(0);

  useEffect(() => {
    itemService.getAll().then((initialNotes) => setItems(initialNotes));
  }, []);

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
    };

    itemService.create(newItem).then((returnedItem) => {
      setItems(items.concat(returnedItem));
      setNewItemN("");
      setNewItemQ("");
    });

    setItems(items.concat(newItem));
  };

  const toggleEdit = (id) => {
    const item = items.find((i) => i.id === id);
    const changedItem = { ...item, editState: !item.editState };

    itemService.update(id, changedItem).then((returnedItem) => {
      setItems(items.map((i) => (i.id === id ? returnedItem : i)));
    });
  };

  const toggleDelete = (id) => {
    const item = items.find((i) => i.id === id);
    const changedItem = { ...item, deletedState: !item.deletedState };

    itemService.update(id, changedItem).then((returnedItem) => {
      setItems(items.map((i) => (i.id === id ? returnedItem : i)));
    });
  };

  const handlePermanentDelete = (id) => {
    itemService.deleteItem(id);
    setItems(items.filter((i) => i.id !== id));
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
