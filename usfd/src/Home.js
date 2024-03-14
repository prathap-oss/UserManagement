import React from 'react';
import { Container } from 'react-bootstrap';
import UsersView from './Component/Users/UsersView';


const Home = () => {
  return (
    <Container className='mt-5 '>
      <h2>Welcome to home Page</h2>
     <UsersView></UsersView>
    </Container>
   
  );
}



export default Home;
