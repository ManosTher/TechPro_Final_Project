import React, { useState } from 'react';

const ItemAdd = () => {
  const [itemName, setItemName] = useState('');

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the logic for adding an item using the form data (itemName)
    // You can use this data to make an API call or update the state in the parent component
    console.log(`Added item: ${itemName}`);
    // Reset the form field
    setItemName('');
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={handleItemNameChange}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ItemAdd;
