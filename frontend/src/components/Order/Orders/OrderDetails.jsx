import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
    const [orddt, setOrddt] = useState([]);
    const { orderId } = useParams();
    const [showAddOrder, setShowAddOrder] = useState(false);
    console.log(orderId);
  
    useEffect(() => {
      loadOrddt();
      console.log()
    }, [orderId]);
  
    const loadOrddt = async () => {
        try {
          const response = await fetch(`http://localhost:8080/orderdetails/order/${orderId}`);
          if (response.ok) {
            const data = await response.json();

            setOrddt(data);
          } else {
            console.error('Error loading order details:', response.status);
          }
        } catch (error) {
          console.error('Error loading order details:', error);
        }
      };
  
      const deleteOrrt = async (orderDetailsId) => {
        try {
          const response = await fetch(`http://localhost:8080//orderdetails/delete-by-order-id/${orderDetailsId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            loadOrddt();
          } else {
            console.error('Error deleting OrderDetails:', response.status);
          }
        } catch (error) {
          console.error('Error deleting OrderDetails:', error);
        }
      };
  
 
    console.log(orddt);
    
   
        
    return (
        <div className="container">
        <div className="py-4">                    
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
                <td>{item.order.orderDate}</td>
                <td>{item.item.itemName}</td>
                <td>{item.quantity}</td>
                <td>
                    <button className="btn btn-danger mx-3" onClick={() => deleteOrrt(item.orderDetailsId)}>
                        Delete
                    </button>
                </td>
              </tr>
            ))} 
            </tbody>
          </table>
        </div>
      </div>
      

    )
};

export default OrderDetails;
