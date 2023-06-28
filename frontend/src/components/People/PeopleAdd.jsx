import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function () {

    let navigate = useNavigate();

    const [people,setPeople] = useState({
        firstName:"",
        lastName:"",
        email:"",
    });
    const {firstName,lastName,address,zipCode,phoneNumber,email,city, state} = people;

    // Function to handle input change
    const onInputChange=(e)=>{
        setPeople({...people,[e.target.name]: e.target.value});
    };

    // Function to handle form submission
    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            for(let attr in people) {
                if(people[attr] === "") {
                    toast(`A field is empty, Please populate all of them`);
                    return;
                }
            }
            await axios.post("http://localhost:8080/people",people); // Submit the form data to the server
            navigate("/");
        } catch (e){
            toast(e.response.data.error);
        }
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border p-4 mt-2 shadow">
                <h2 className="text-center m-4">Register</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={firstName}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={lastName}
                    onChange={(e)=>onInputChange(e)}/>
                </div>                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        E-mail
                    </label>
                    <input
                    type={"email"}
                    className="form-control"
                    placeholder="Enter your e-mail"
                    name="email"
                    value={email}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                
                <button type="submit" className="btn btn-outline-primary">
                    Submit
                </button>
                <Link className="btn btn-outline-danger mx-2" to="/">
                    Cancel
                </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
