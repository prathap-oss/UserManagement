import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import {FaTrashAlt,FaEdit,FaEye} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from '../Common/Search';

const UsersView = () => {
  // Creating useState to get result
  const [users, setUsers] = useState([]);

  // Using useEffect to load users
  useEffect(() => {
    loadUsers();
  }, []);

  // Function to load users from the server
  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:4000/User");
      setUsers(result.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleDelete  = async(id)=>{
    await axios.delete(`http://localhost:4000/User/delete/${id}`);
    loadUsers();
  }

  return (
    <Container fluid  className="mg-auto mt-5">

       <Search/>
      <table className="table table-border table-hover shadow mt-5">
        <thead>
          <tr className="text-center">
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td className="mx-2">
                <Link to={`/user/${user.id}`} className="btn btn-info">View <FaEye/></Link>
              </td>
              <td className="mx-2">
                <Link to={`/edit-user/${user.id}`}><button className="btn btn-warning">Edit  <FaEdit/></button></Link>

              </td>
              <td className="mx-2">

                <button className="btn btn-danger" onClick={()=>handleDelete(user.id)}>Delete <FaTrashAlt/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default UsersView;
