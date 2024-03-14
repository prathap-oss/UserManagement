import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';

const EditUser = () => {
    let Navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
      name: "",
      email: "",
      mobile: "",
    });

    const { name, email, mobile } = user;

    useEffect(() => {
      loadUser();
    }, []);

    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/User/update/${id}`);
        setUser(result.data); // Set data to the user state, not users
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    const handleInputChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    };

    const updateUser = async (e) => {
      e.preventDefault();
      await axios.put(`http://localhost:4000/User/update/${id}`, user);
      Navigate("/ViewAllUsers");
    };

    return (
      <Container fluid className="col-sm-8 py-2 px-5 offset shadow mt-5">
        <form onSubmit={(e) => updateUser(e)}>
          <h1 className="text-center">Edit User</h1>
          <div className="input-group mb-5">
            <label htmlFor="name" className="input-group-text">
              Name:
            </label>
            <input
              type="text"
              className="form-control col-sm-5"
              name="name"
              id="name"
              value={name}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-5">
            <label htmlFor="email" className="input-group-text">
              Email:
            </label>
            <input
              type="email"
              className="form-control col-sm-5"
              name="email"
              id="email"
              value={email}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-5">
            <label htmlFor="mobile" className="input-group-text">
              Mobile:
            </label>
            <input
              type="tel"
              pattern="[0-9]*"
              className="form-control col-sm-5"
              name="mobile"
              id="mobile"
              value={mobile}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="row mb-5">
            <div className="col-sm-2 mx-2">
              <button type="submit" className=" btn btn-outline-success btn-lg">
                Save
              </button>
            </div>
            <div className="col-sm-2 mx-2">
              <Link
                to={"/ViewAllUsers"}
                type="submit"
                className=" btn btn-outline-warning btn-lg"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </Container>
    );
};

export default EditUser;
