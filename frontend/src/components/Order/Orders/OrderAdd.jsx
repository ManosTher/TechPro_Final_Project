import React, { useState , useEffect } from 'react';


const AddOrder = ({ orderId , OrderDetailsByOrderId , closePopup }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
   console.log(orderId);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const fetchOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}`);
      if (response.ok) {
        const orderData = await response.json();
        console.log(orderData);
        return orderData;
      } else {
        console.error('Error fetching order:', response.status);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  
  
  const createItem = async () => {
    try {
      const item = {
        itemName: itemName
      };

      const response = await fetch(`http://localhost:8080/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      const createdItem = await response.json();
      console.log(createdItem);
      return createdItem;
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateOrderWithItem = async (orderData, itemId, quantity) => {
    const item = {
      item: {
        itemID: itemId
      },
      quantity: parseInt(quantity),
      orderId: orderData
    };
  
    console.log(updateOrderWithItem);

    const response = await fetch(`http://localhost:8080/orderdetails/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    const updatedOrder = await response.json();
    console.log(updatedOrder);
    return updatedOrder;
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const orderData = await fetchOrder(orderId);

      // Step 2: Create the item object
      const createdItem = await createItem();

      // Step 3: Update the order object with the item details
      const updatedOrder = await updateOrderWithItem(
        orderData,
        createdItem.itemID,
        quantity
      );

      console.log('Order created:', updatedOrder);
      OrderDetailsByOrderId();
      closePopup();
    } catch (error) {
      console.error('Error creating order:', error);
    }    
  };
  
  
  
  return (
    <div className="container">
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            value={itemName}
            onChange={handleItemNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
