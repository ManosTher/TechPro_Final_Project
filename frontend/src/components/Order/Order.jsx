import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddOrder from './Orders/OrderAdd';


const OrderList = ({personId}) => {
  const [orders, setOrders] = useState([]);
  const Id = useParams();
  console.log(Id.personID);
  const { personID } = useParams();
  const [showAddOrder, setShowAddOrder] = useState(false);
  
  
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

  useEffect(() => {
    fetchOrders();
  }, [personId]);

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
        // Refresh the order list after successful deletion
        fetchOrders();
      } else {
        console.error('Error deleting order:', response.status);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


    const handleAddOrderClick = async () => {
      setShowAddOrder(!showAddOrder);
    
      if (!showAddOrder) {
        // Fetch the updated order list after closing the popup
        await fetchOrders();
      }
    };

  

  return (
    <div className="container">
      <div className="py-4">
        <button className="btn btn-outline-primary" onClick={handleAddOrderClick}>
          Add Order
        </button>
        {showAddOrder && <AddOrder personId={Id.personID} fetchOrders={fetchOrders} closePopup={handleAddOrderClick}/>}


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
