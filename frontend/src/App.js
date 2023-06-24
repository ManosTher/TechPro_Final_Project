import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css';
import PeopleEdit from './components/People/PeopleEdit';
import PeopleAdd from './components/People/PeopleAdd';
import OrdersDetails from './components/Order/Orders/OrderDetails';
import Order from './components/Order/Order';
import OrderAdd from './components/Order/Orders/OrderAdd';

function App() {
  return (
    <Router>
      <div>
        {/* Add your navigation links here */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/people/add">People Add</Link>
            </li>
            <li>
              <Link to="/people/edit">People Edit</Link>
            </li>
            <li>
              <Link to="/people/add">People Add</Link>
            </li>
            <li>
              <Link to="/order/add">Order Add</Link>
            </li>
            <li>
              <Link to="/orders/person">Person Orders</Link>
            </li>


          </ul>
        </nav>
        {/* Add your routes here */}
        <Routes>
          <Route path="/" element={<Home />} />          
          <Route path="/people/add" element={<PeopleAdd />} />
          <Route path="/people/edit/:personID" element={<PeopleEdit />} />
          <Route path="/order/add/:personID" element={<OrderAdd />} />
          <Route path="/orders/person/:personID" element={<Order />} />
          <Route path="/orders/ordersdetails/:orderId" element={<OrdersDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
