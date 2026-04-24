import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = props => {

    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const onChangeName = e => {
        const name = e.target.value;
        setName(name);
    }

    const onChangeId = e => {
        const id = e.target.value;
        setId(id);
    }

    const login = () => {
        props.login({ name: name, id: id })
        props.history.push('/')
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter id"
                        value={id}
                        onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login;

// Summary

// This `Login` component is a simple React form that collects a username and ID, then logs the user into the application.

// **Core functionality:**

// * Uses `useState` to manage two pieces of input state:

//   * `name` (username)
//   * `id` (user ID)
// * Updates state in real time as the user types via `onChangeName` and `onChangeId` handlers.

// **User interaction:**

// * When the **Submit** button is clicked:

//   * Calls `props.login()` and passes an object containing the entered `name` and `id`.
//   * Redirects the user to the home page (`'/'`) using `props.history.push`.

// **UI structure:**

// * Built with React Bootstrap components (`Form`, `Form.Group`, `Form.Control`, `Button`).
// * Contains:

//   * A text input for username
//   * A text input for ID
//   * A submit button

// **Key points:**

// * It’s a controlled form: input values are tied directly to component state.
// * No validation or authentication logic is included—it simply passes the entered data upward.
// * Navigation after login is handled programmatically.

// **In short:**
// This component provides a basic login form that captures user details, sends them to a parent handler, and redirects the user to the homepage.
