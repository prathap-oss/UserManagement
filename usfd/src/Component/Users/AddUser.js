import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const AddUser = () => {
  let Navigate= useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });
const {name,email,mobile}=user;

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/User/add", user);
    Navigate("/ViewAllUsers")
  };

  return (
    <Container fluid className="col-sm-8 py-2 px-5 offset shadow mt-5">
      <form onSubmit={(e)=>saveUser(e)}>
        <h1 className="text-center">Fill the Details below</h1>
        <div className="input-group mb-5">
          <label htmlFor="name" className="input-group-text">
            Name:
          </label>
          <input
            type="text"
            className="form-control col-sm-5"
            name="name"
            id="name"
            value={user.name}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-5">
          <label htmlFor="email" className="input-group-text">
            Email:
          </label>
          <input
            type="text"
            className="form-control col-sm-5"
            name="email"
            id="email"
            value={user.email}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-5">
          <label htmlFor="mobile" className="input-group-text">
            Mobile:
          </label>
          <input
            type=""
            className="form-control col-sm-5"
            name="mobile"
            id="mobile"
            value={user.mobile}
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

export default AddUser;
