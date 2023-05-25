import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const ListPlayers = ({ activeTab, token }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const res = await axios.get('http://localhost:8000/api/players', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPlayers(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchPlayers();

    }, [token]);

    const deletePlayer = (id) => {
        axios.delete(`http://localhost:8000/api/players/${id}`)
            .then(() => setPlayers(players.filter(player => player._id !== id)))
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-start custom-container">
            <div className="custom-box">
                <h2 className="custom-text">List Players</h2>
                <Table className="custom-table">
                    <thead>
                        <tr>
                            <th className="custom-text">Player Name</th>
                            <th className="custom-text">Preferred Position</th>
                            <th className="custom-text">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player._id}>
                                <td><Link to={`/players/edit/${player._id}`} className="custom-text"><span>{player.name}</span> </Link></td>
                                <td className="custom-text">{player.preferredPosition}</td>
                                <td><button onClick={() => deletePlayer(player._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )

}

export default ListPlayers;