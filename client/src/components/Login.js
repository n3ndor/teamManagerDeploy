import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container, Form, Button } from 'react-bootstrap';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/auth', { username, password });
            onLogin(res.data.token);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-start custom-container">
            <div className='custom-box'>
                <h2>To get more access please Log In !</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>User Name:</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        Password:
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100 mt-3">Login</Button>
                </Form>
                <Button variant="link" type="" className="w-100 mt-3">
                    <Link to="/register">Don't have an account? Go to Register</Link>
                </Button>
            </div>

        </Container>
    );
}

export default Login;
