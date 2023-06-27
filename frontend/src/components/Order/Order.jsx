import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';



const OrderList = ({personId}) => {
  const [orders, setOrders] = useState([]);
  const Id = useParams();
  console.log(Id.personID);
  const { personID } = useParams();
  
  useEffect(() => {
    fetchOrders();
  }, [personId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/orders/person/${personID}/orders`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } else {
        console.error('Error fetching orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const createOrder = async () => {
    try {

      const response = await fetch(`http://localhost:8080/people/${personID}`);
      const orderData = await response.json();
      console.log(orderData);
  
      const order = {
        person: {
          personID: orderData.personID,
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          email: orderData.email
        },
        orderDate: new Date().toISOString().split('T')[0] // Set the current date as the order date
      };
      console.log(order);
      const responsepost = await fetch(`http://localhost:8080/orders/`, {
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



  const deleteOrder = async (orderId) => {
    try {
      
      const deleteOrderDetailsResponse = await fetch(`http://localhost:8080/orderdetails/delete-by-order-id/${orderId}`, {
      method: 'DELETE'
    });
    if (!deleteOrderDetailsResponse.ok) {
      console.error('Error deleting order details:', deleteOrderDetailsResponse.status);
      return;
    }

      
      const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Manually update the orders state after successful deletion
        setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
      } else {
        console.error('Error deleting order:', response.status);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleAddOrderClick = async () => {
    // Call the createOrder function to create a new order
    await createOrder();

    // Fetch the updated order list
    fetchOrders();
  }; 

  

  return (
    <div className="container">
      <div className="py-4">
        <button className="btn btn-outline-primary" onClick={handleAddOrderClick}>
          Add Order
        </button>       


        <div>
          <h2>Order List</h2>
          <ul>
            {orders.map(order => (
              <li key={order.orderId}>
                <span>{order.orderDate}</span>
                <Link className="btn btn-outline-primary mx-3" to={`/orders/ordersdetails/${order.orderId}`}>
                  Orders
                </Link>
                <button className="btn btn-danger" onClick={() => deleteOrder(order.orderId)}>
      Delete
    </button>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
