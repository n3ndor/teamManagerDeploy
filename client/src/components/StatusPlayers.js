import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

const StatusPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [selectedGame, setSelectedGame] = useState('gameOneStatus');

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(res => setPlayers(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleStatusChange = (id, status) => {
        axios.patch(`http://localhost:8000/api/players/${id}`, { [selectedGame]: status })
            .then(res => {
                setPlayers(players.map(player => player._id === id ? res.data : player));
            })
            .catch(err => console.log(err));
    };

    return (
        <Container className="d-flex justify-content-center align-items-start custom-container">
            <div className="custom-box">
                <h2 className="custom-text text-center mb-4">Player Status</h2>
                <div className="text-center">
                    <Button variant="outline-success" onClick={() => setSelectedGame('gameOneStatus')} className={selectedGame === 'gameOneStatus' ? 'active' : ''}>Game 1</Button>
                    <Button variant="outline-warning" onClick={() => setSelectedGame('gameTwoStatus')} className={selectedGame === 'gameTwoStatus' ? 'active' : ''}>Game 2</Button>
                    <Button variant="outline-info" onClick={() => setSelectedGame('gameThreeStatus')} className={selectedGame === 'gameThreeStatus' ? 'active' : ''}>Game 3</Button>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th className="custom-text">Player Name</th>
                            <th className="custom-text">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player._id}>
                                <td className="custom-text">{player.name}</td>
                                <td>
                                    <Button variant={player[selectedGame] === 'Playing' ? 'success' : 'outline-success'} onClick={() => handleStatusChange(player._id, 'Playing')}>Playing</Button>
                                    <Button variant={player[selectedGame] === 'Not Playing' ? 'danger' : 'outline-danger'} onClick={() => handleStatusChange(player._id, 'Not Playing')}>Not Playing</Button>
                                    <Button variant={player[selectedGame] === 'Undecided' ? 'warning' : 'outline-warning'} onClick={() => handleStatusChange(player._id, 'Undecided')}>Undecided</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default StatusPlayers;
