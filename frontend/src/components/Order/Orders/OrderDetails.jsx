import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';import 'react-toastify/dist/ReactToastify.css';
import AddOrder from "../Orders/OrderAdd";
import OrderDetailsEdit from "../Orders/OrderDetailsEdit";

const OrderDetails = () => {
  const [orddt, setOrddt] = useState([]);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [showEditOrder, setShowEditOrder] = useState(false);
  const [editOrderDetailsId, setEditOrderDetailsId] = useState(null);

  const { orderId } = useParams();
  const navigate = useNavigate();
  console.log(orderId);

  const OrderDetailsByOrderId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/orderdetails/order/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrddt(data);
      } else {
        console.error('Error fetching order details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    OrderDetailsByOrderId();
  }, [orderId]);

  const deleteOrrt = async (orderDetailsId) => {
    try {
      const response = await fetch(`http://localhost:8080/orderdetails/${orderDetailsId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        OrderDetailsByOrderId();
      } else {
        console.error('Error deleting OrderDetails:', response.status);
      }
    } catch (error) {
      console.error('Error deleting OrderDetails:', error);
    }
  };

  const handleAddOrderClick = async () => {
    setShowAddOrder(!showAddOrder);

    if (!showAddOrder) {
      // Fetch the updated order list after closing the popup
      await OrderDetailsByOrderId();
    }
  };

  const handleEditOrderClick = (orderDetailsId) => {
    setEditOrderDetailsId(orderDetailsId);
    setShowEditOrder(true);
  };

  const handleEditOrderDetailsClose = () => {
    setShowEditOrder(false);
    setEditOrderDetailsId(null);
    // Fetch the updated order list after closing the edit popup
    OrderDetailsByOrderId();
  };

  

  return (
    <div className="container">
      <div className="py-4">
        <button className="btn btn-outline-primary" onClick={handleAddOrderClick}>
          Add Order
        </button>
        {showAddOrder && <AddOrder orderId={orderId} OrderDetailsByOrderId={OrderDetailsByOrderId} closePopup={handleAddOrderClick} />}

        {showEditOrder && (
          <OrderDetailsEdit orderDetailsId={editOrderDetailsId} loadOrderDetails={OrderDetailsByOrderId} onClose={handleEditOrderDetailsClose} />
        )}

        <table className="table border shadow">
          <thead className="thead-light">
            <tr>
              <th scope="col">A/A</th>
              <th scope="col">Date Order</th>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orddt.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.orderId.orderDate}</td>
                <td>{item.item.itemName}</td>
                <td>{item.quantity}</td>
                <td>
                  <div>
                    <button className="btn btn-primary mx-3" onClick={() => handleEditOrderClick(item.orderDetailsId)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteOrrt(item.orderDetailsId)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
