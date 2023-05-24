import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const Register = ({ onRegister }) => {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/register', { fullName, userName, email, password });
            onRegister(res.data.token);
            navigate('/login');
        } catch (error) {
            console.error(error);
            // Inspect the error object and use the error message from the server.
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-start custom-container">
            <div className='custom-box'>
                <h2>New User have to Register:</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>First and Last Name:</Form.Label>
                        <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>User Name: *</Form.Label>
                        <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: *</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <br />
                    {error && <p className='text-danger'>{error}</p>}
                    <Button variant="success" type="submit" className="w-100 mt-3">Register</Button>
                </Form>
                <Button variant="link" className="w-100 mt-3">
                    <Link to="/login">Already have an account? Login</Link>
                </Button>
                <p>Remember your User Name and Password - you will need for Login</p>
            </div>

        </Container>
    );
}

export default Register;
