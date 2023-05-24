import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;
const CONNECTION_PORT = 'localhost:8000/';

function Chat() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket = io(CONNECTION_PORT);

        //oldMessages
        socket.on("chat history", (data) => {
            setMessageList(data);
        });

        //newMessages
        socket.on("message", (data) => {
            setMessageList((newMessages) => [...newMessages, data]);
        });
    }, []);

    // Join the chatroom
    const connectToRoom = () => {
        setLoggedIn(true);
        socket.emit("join", { userName });
    };

    const logOut = () => {
        setLoggedIn(false);
        setUserName("");
        setMessageList([]);
    };

    const sendMessage = async () => {
        let messageContent = {
            user: userName,
            text: message,
        };

        setMessage("");

        socket.emit("sendMessage", messageContent);
    };

    return (
        <div className="Chat">
            {!loggedIn ? (
                <div className="logIn">
                    <div>
                        <input type="text" placeholder="Name..." onChange={(e) => { setUserName(e.target.value); }} />
                        <button onClick={connectToRoom}>Enter Chat</button>
                    </div>
                </div>
            ) : (
                <div className="chatContainer">
                    <div className="userHeader">
                        <h2>Welcome, {userName}!</h2>
                        <button onClick={logOut}>Log Out</button>
                    </div>
                    <div className="messages">
                        {messageList.map((val, key) => {
                            return (
                                <div className="messageContainer" key={key}>
                                    <div className="messageIndividual">
                                        {val.user}: {val.text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="messageInputs">
                        <input type="text" placeholder="Message..." value={message} onChange={(e) => { setMessage(e.target.value); }} />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
