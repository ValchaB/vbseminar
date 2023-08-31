import "./App.css";
import Input from "./Input";
import React, { useState, useEffect, useRef } from "react";

export const generateRandomUsername = () => {
  const names = [
    "Rosemary", "Dill", "Mint", "Parsley", "Sage", "Basil", "Chives", "Cilantro",
  ];
  const randomIndex = () => Math.floor(Math.random() * names.length);
  return `${names[randomIndex()]}`;
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    username: generateRandomUsername(),
  });
  const droneRef = useRef(
    new window.Scaledrone("RlIod7L3pbd1Mbon", {
      data: user,
    })
  );

  useEffect(() => {
    const drone = droneRef.current;

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      setUser((prevUser) => ({ ...prevUser, id: drone.clientId }));
    });

    const room = drone.subscribe("observable-imaDaRadi");
    room.on("data", (data, user) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random(), user, text: data },
      ]);
    });
  }, []);

  const sendMessage = (message) => {
    droneRef.current.publish({
      room: "observable-imaDaRadi",
      message,
    });
  };

  return (
    <div className="App">
      <div className="Header">
        <h1>Let's Chat!</h1>
      </div>
      <ul className="List">
        {messages.map((message) => (
          <li
            key={message.id}
            className={message.id === user.id ? "message currentUser" : "message"}
          style={{ backgroundColor: message.user.clientData.color }}
          >
            <div className="Message-content">
              <div className="username">{message.user.clientData.username}</div>
              <div className="text">{message.text}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="forma"><Input sendMessage={sendMessage} /></div>
    </div>
  );
};

export default App;