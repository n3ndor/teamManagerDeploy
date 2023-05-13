import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const AddPlayer = () => {
    const navigate = useNavigate();
    const [player, setPlayer] = useState({ name: '', preferredPosition: '' });

    const handleChange = (e) => {
        setPlayer({ ...player, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/players', player)
            .then(res => {
                console.log(res.data);
                navigate('/players/list');
            })
            .catch(err => console.log(err));
    }

    return (
        <Container className="d-flex justify-content-center align-items-start custom-container">
            <div className="custom-box">
                <h2 className="custom-text text-center mb-4">Add Player</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Player Name:</Form.Label>
                        <Form.Control type="text" name="name" value={player.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preferred Position:</Form.Label>
                        <Form.Control as="select" name="preferredPosition" value={player.preferredPosition} onChange={handleChange}>
                            <option value="">Select...</option>
                            <option value="Forward">Forward</option>
                            <option value="Midfielder">Midfielder</option>
                            <option value="Goalkeeper">Goalkeeper</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100 mt-3">Add</Button>
                </Form>
            </div>
        </Container>
    )
}

export default AddPlayer;
