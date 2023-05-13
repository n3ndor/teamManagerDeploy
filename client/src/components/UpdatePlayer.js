import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const UpdatePlayer = () => {
    const [name, setName] = useState("");
    const [preferredPosition, setPreferredPosition] = useState("");
    const [gameOneStatus, setGameOneStatus] = useState("Undecided");
    const [gameTwoStatus, setGameTwoStatus] = useState("Undecided");
    const [gameThreeStatus, setGameThreeStatus] = useState("Undecided");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/players/${id}`)
            .then(res => {
                setName(res.data.name);
                setPreferredPosition(res.data.preferredPosition);
                setGameOneStatus(res.data.gameOneStatus);
                setGameTwoStatus(res.data.gameTwoStatus);
                setGameThreeStatus(res.data.gameThreeStatus);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [id]);

    const updatePlayer = e => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/players/${id}`, { name, preferredPosition, gameOneStatus, gameTwoStatus, gameThreeStatus })
            .then(() => navigate('/players/list'))
            .catch(err => console.log(err));
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Container className="d-flex justify-content-center align-items-start custom-container">
            <div className="custom-box">
                <h2 className="custom-text text-center mb-4">Update Player</h2>
                <Form onSubmit={updatePlayer}>
                    <Form.Group className="mb-3">
                        <Form.Label>Player Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Preferred Position</Form.Label>
                        <Form.Control as="select" value={preferredPosition} onChange={e => setPreferredPosition(e.target.value)}>
                            <option value="">Choose a Position</option>
                            <option value="Forward">Forward</option>
                            <option value="Midfielder">Midfielder</option>
                            <option value="Goalkeeper">Goalkeeper</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Game 1 Status</Form.Label>
                        <Form.Control as="select" value={gameOneStatus} onChange={e => setGameOneStatus(e.target.value)}>
                            <option value="Undecided">Undecided</option>
                            <option value="Playing">Playing</option>
                            <option value="Not Playing">Not Playing</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Game 2 Status</Form.Label>
                        <Form.Control as="select" value={gameTwoStatus} onChange={e => setGameTwoStatus(e.target.value)}>
                            <option value="Undecided">Undecided</option>
                            <option value="Playing">Playing</option>
                            <option value="Not Playing">Not Playing</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Game 3 Status</Form.Label>
                        <Form.Control as="select" value={gameThreeStatus} onChange={e => setGameThreeStatus(e.target.value)}>
                            <option value="Undecided">Undecided</option>
                            <option value="Playing">Playing</option>
                            <option value="Not Playing">Not Playing</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="success" type="submit">Update Player</Button>
                </Form>
            </div>
        </Container>
    );
}

export default UpdatePlayer;
