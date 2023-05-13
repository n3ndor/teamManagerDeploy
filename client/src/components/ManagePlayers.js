import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const ManagePlayers = ({ setActiveTab }) => {
    return (
        <Nav className="sticky-top">
            <Nav.Item>
                <Nav.Link as={Link} to="/players/list" onClick={() => setActiveTab('list')}><span>List</span> </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/players/addplayer" onClick={() => setActiveTab('addplayer')}><span>Add Player</span> </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default ManagePlayers;
