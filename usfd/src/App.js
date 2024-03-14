import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch
} from "react-router-dom";
import NavBar from "./Component/Common/NavBar";
import UsersView from "./Component/Users/UsersView";
import AddUser from "./Component/Users/AddUser";
import Home from "./Home";

import EditUser from "./Component/Users/EditUser";
import UserProfile from './Component/Users/UserProfile'
function App() {
 

  return (
    <Router>
      <NavBar/>
      <div className="App">
        <Switch>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/ViewAllUsers" element={<UsersView/>} />
          <Route exact path="/AddUser" element={<AddUser/>} />
          <Route exact path="/edit-user/:id" element={<EditUser/>} /> {/* corrected route path */}
          <Route exact path="/user/:id" element={<UserProfile />} />
          <Route element={NotFound} />
        </Switch>
      </div>
    </Router>

  );
}

const NotFound = () => {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default App;
