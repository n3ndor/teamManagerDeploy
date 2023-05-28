import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';

const CONNECTION_PORT = 'localhost:8000/';

function Chat({ userName }) {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIOClient = io(CONNECTION_PORT);
        setSocket(socketIOClient);

        socketIOClient.on('chatHistory', (history) => {
            console.log('Received chatHistory with', history);
            setMessageList(history);
        });

        socketIOClient.on('chatMessage', (data) => {
            setMessageList((oldMessages) => [...oldMessages, data]);
        });

        // Emit joinChat event after setting up the socket connection
        if (userName) {
            socketIOClient.emit('joinChat', { userName });
        }

        // Cleanup on unmount
        return () => {
            if (userName) {
                socketIOClient.emit('leaveChat', { userName });
            }
            socketIOClient.disconnect();
        };
    }, [userName]);

    const sendMessage = () => {
        if (socket) {
            let messageContent = {
                user: userName,
                text: message,
            };

            setMessage("");

            socket.emit("sendChatMessage", messageContent);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-start custom-container">
            <div className='custom-box'>
                <h2>Welcome, {userName}!</h2>
                <div className="messages">
                    {messageList.map((val, key) => {
                        return (
                            <div className="messageContainer" key={key}>
                                <div className="messageIndividual" style={{ color: val.user === 'Chat Admin' ? 'red' : 'auto' }}>
                                    {val.user}: {val.text}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Form>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Message..." value={message} onChange={(e) => { setMessage(e.target.value); }} />
                        </Col>
                        <Col sm={2}>
                            <Button onClick={sendMessage}>Send</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
}

export default Chat;
