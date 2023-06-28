import React, { useState, useEffect } from 'react';

const OrderDetailsEdit = ({ orderDetailsId, orderId, loadOrderDetails, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [itemID, setItemID] = useState('');

  const [quantity, setQuantity] = useState('');
  const [order, setOrder] = useState('');

  useEffect(() => {
    // Fetch order details by orderDetailsId and set the initial values for itemName and quantity
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orderdetails/${orderDetailsId}`);
        if (response.ok) {
          const orderDetailsData = await response.json();
          setItemName(orderDetailsData.item.itemName);
          setItemID(orderDetailsData.item.itemID);
          setQuantity(orderDetailsData.quantity);
          setOrder(orderDetailsData.orderId);
        } else {
          console.error('Error fetching order details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderDetailsId]);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const updateOrderDetails = async () => {
    try {
      const orderDetails = {
        item: {
          itemID: itemID,
          itemName: itemName
        },
        orderDetailsId: orderDetailsId,
        orderId: {
          orderId: order.orderId,
          orderDate: order.orderDate,
          person: {
            email: order.person.email,
            firstName: order.person.firstName,
            lastName: order.person.lastName,
            personID: order.person.personID
          }
        },
        quantity: parseInt(quantity)
      };

      const response = await fetch(`http://localhost:8080/orderdetails/${orderDetailsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      });

      const updatedOrderDetails = await response.json();
      console.log(updatedOrderDetails);
      return updatedOrderDetails;
    } catch (error) {
      console.error('Error updating order details:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update the order details
      const updatedOrderDetails = await updateOrderDetails();
      console.log('Order details updated:', updatedOrderDetails);

      // Reload the order details list
      loadOrderDetails();

      // Close the edit popup
      onClose();
    } catch (error) {
      console.error('Error updating order details:', error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Order</h2>
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
          Update Order
        </button>
      </form>
    </div>
  );
};

export default OrderDetailsEdit;
