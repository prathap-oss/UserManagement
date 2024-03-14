import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/User/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  return (
    <Container  className="mt-4">
      {user ? (
        <Card>
          <Card.Body>
            <div className="text-center mb-4">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                />
              ) : (
                <div>No profile image available</div>
              )}
            </div>
            <div className="text-center mb-3">
              <Button variant="primary" className="me-3" onClick={() => console.log("Call button clicked")}>
                Call
              </Button>
              <Button variant="success" onClick={() => console.log("Message button clicked")}>
                Message
              </Button>
            </div>
            <hr />
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mobile:</strong> {user.mobile}</p>
              {/* You can display additional user information here */}
            </div>
            <div className="text-center mt-3">
              <Link to={`/edit-user/${user.id}`}>
                <Button variant="warning">Edit Profile</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default UserProfile;
