import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditUser() {

    let navigate = useNavigate();
    const { personID } = useParams();

    const [people, setPeople] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const { firstName, lastName, email } = people;

    // Function to handle input change
    const onInputChange = (e) => {
        setPeople({ ...people, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadPeople();
    }, []);

    // Function to load user data
    const loadPeople = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/people/${personID}`);
            setPeople(response.data);
        } catch (error) {
            toast(error.response.data.error);
        }
    };

    // Function to handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let peopleToEdit = people;
            await axios.put(`http://localhost:8080/people/${personID}`, peopleToEdit); // Submit the updated user data to the server
            navigate("/");
        } catch (error) {
            toast(error.response.data.error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>
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
                                onChange={(e) => onInputChange(e)} />
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
                                onChange={(e) => onInputChange(e)} />
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
                                onChange={(e) => onInputChange(e)} />
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
