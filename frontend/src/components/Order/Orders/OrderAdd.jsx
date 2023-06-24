import React, { useState , useParams ,useEffect} from 'react';


const AddOrder = ({ personId,fetchOrders,closePopup }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [person, setPerson] = useState(null);
   console.log(personId);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const createOrder = async () => {
    try {
      // Fetch person details by personId from the API
      const response = await fetch(`http://localhost:8080/people/${personId}`);
      const personData = await response.json();
      console.log(personData);
  
      const order = {
        person: {
          personID: personData.personID,
          firstName: personData.firstName,
          lastName: personData.lastName,
          email: personData.email
        },
        orderDate: new Date().toISOString().split('T')[0] // Set the current date as the order date
      };
      
      const responsepost = await fetch(`http://localhost:8080/orders/person/${personId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
  
      const createdOrder = await responsepost.json();
      console.log(createdOrder);
      return createdOrder;
    } catch (error) {
      console.error('Error creating order:', error);
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

  const updateOrderWithItem = async (orderId, itemId, quantity) => {
    const item = {
      item: {
        itemID: itemId
      },
      quantity: parseInt(quantity),
      order: {
        orderId: orderId
      }
    };
  
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
      // Step 1: Create the order object
      const createdOrder = await createOrder();
      // Step 2: Create the item object
      const createdItem = await createItem();


      // Step 3: Update the order object with the item details
      const updatedOrder = await updateOrderWithItem(
        createdOrder.orderId,
        createdItem.itemID,
        quantity
      );

      console.log('Order created:', updatedOrder);
      
      fetchOrders();
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
