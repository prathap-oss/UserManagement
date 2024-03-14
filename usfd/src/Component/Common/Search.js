import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searched, setSearched] = useState(false); // Track if search button is clicked

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/User/${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching user by ID:', error);
      setSearchResults(null);
    }
    setSearched(true); // Set searched to true after search button is clicked
  };

  return (
    <Container fluid className="mt-4">
      <Form onSubmit={handleSearch} className="mb-4 row">
        <Form.Group controlId="searchTerm" className='col-sm-6'>
          <Form.Control
            type="text"
            placeholder="Enter user ID to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value) } 
          />
        </Form.Group>
        <Button variant="primary" type="submit" className='col-sm-6'>
          Search <FaSearch/>
        </Button>
      </Form>
      {(searched && !searchResults) && ( // Render "No user found" message only if search button is clicked and no results found
        <Card>
          <Card.Body>
            <Card.Text>No user found with ID: {searchTerm}</Card.Text>
          </Card.Body>
        </Card>
      )}
      {searchResults && (
        <Card>
          <Card.Body>
            <Card.Title>User Details</Card.Title>
            <p><strong>Name:</strong> {searchResults.name}</p>
            <p><strong>Email:</strong> {searchResults.email}</p>
            <p><strong>Mobile:</strong> {searchResults.mobile}</p>
            {/* Add more user details here as needed */}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Search;
