import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Form, Button } from 'react-bootstrap';

const Login = ({ onLogin, setUser }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/login', { userName, password });
            if (res.data.error) {
                // Handle validation errors here
                console.error(res.data.error);
                setError(res.data.error);
            } else {
                // On successful login
                onLogin(res.data.token, res.data.user);
                setUser(res.data.user);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                // Store user and token in local storage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/players/list');
            }
        } catch (error) {
            // Handle network or server errors here
            console.error(error);
            setError('An error occurred while logging in. Please try again.');
        }
    }


    return (
        <Container className="d-flex justify-content-center align-items-start custom-container">
            <div className='custom-box'>
                <h2>To get more access please Log In !</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>User Name:</Form.Label>
                        <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        Password:
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <br />
                    {error && <p>{error}</p>}
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
