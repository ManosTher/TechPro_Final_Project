import React, { useEffect, useState } from 'react';
import './Home.css'
import { Link , navigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const [people, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/people");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } else {
        console.error('Error loading users:', response.status);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/people/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        loadUsers();
      } else {
        console.error('Error deleting user:', response.status);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  return (
    <div className="container">
      <div className="py-4">
      <Link to="/people/add" className="btn btn-primary">Add User</Link>     
        <table className="table border shadow">
          <thead className="thead-light">
            <tr>
              <th scope="col">A/A</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Link className="btn btn-outline-primary mx-3" to={`/orders/person/${user.personID}`}>
                    Orders
                  </Link>
                  <Link className="btn btn-outline-primary mx-3" to={`/people/edit/${user.personID}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-3" onClick={() => deleteUser(user.personID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
