import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {// default user to null
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>
            Movie Reviews
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <Link to={"/movies"}>Movies</Link>
              </Nav.Link>
              <Nav.Link href="#link">
                {user ? (
                  <a onClick={logout}>Logout User</a>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path={["/", "/movies"]} component={MoviesList} />

        <Route
          path="/movies/:id/review"
          render={(props) => <AddReview {...props} user={user} />}
        />

        <Route
          path="/movies/:id"
          render={(props) => <Movie {...props} user={user} />}
        />

        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        />
      </Switch>
    </div>
  );
}

export default App;

// Summary
// This code defines the main **App component** for a React-based movie review application. Here’s a clear summary of what it does:

// The app uses **React Router** to handle navigation between different pages and **React Bootstrap** to style the interface, particularly the navigation bar.

// At its core, the component manages a single piece of state: `user`. This represents whether someone is logged in. Two helper functions control this state:

// * `login(user)` sets the current user
// * `logout()` clears the user (logs them out)

// The **navigation bar** at the top includes:

// * A link to the Movies page
// * A conditional Login/Logout option:

//   * If a user is logged in → shows “Logout User”
//   * If no user → shows a link to the Login page
// * A dropdown menu with placeholder items

// The **routing system** determines which component renders based on the URL:

// * `/` or `/movies` → shows the movie list (`MoviesList`)
// * `/movies/:id` → shows details for a specific movie (`Movie`)
// * `/movies/:id/review` → allows adding a review (`AddReview`)
// * `/login` → shows the login page (`Login`)

// Some routes pass extra props:

// * `user` is passed to `Movie` and `AddReview` so they can adjust behavior based on login status
// * `login` is passed to `Login` so it can update the user state after authentication

// In short, this file acts as the **central controller** of the app—handling navigation, user authentication state, and connecting different components together.

