import React, { useState } from "react";

function ListManager() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input) return;
    setItems([...items, { id: Date.now(), text: input }]);
    setInput("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="card">
      <h2>List Manager</h2>

      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter item" />
      <button onClick={addItem}>Add</button>

      {items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.text}
              <button onClick={() => removeItem(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListManager;