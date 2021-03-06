import { useState, useEffect } from "react";
import { LeftChat } from "../parsers/LeftChat";
const { MyNameIs } = require("../parsers/MyNameIs");
const { Message } = require("../parsers/Message");

// Set up a socket that doesn't change as the component re-renders
let socket;

function setupSocket() {
  socket = new WebSocket(`ws://${location.host}`);
}

// Set up a people Map that doesn't change as the component re-renders
let people = new Set();

export default function Chat() {
  const [name, setName] = useState();
  const [host, setHost] = useState();
  const [nameLocked, setNameLocked] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) setupSocket();

    // This could stand to be cleaned up. There are potentially situations where we will receive a message and won't want to
    // set or re-render anything.
    socket.onmessage = (message) => {
      if (message.data === "A new person has entered" && nameLocked) {
        identifySelf();
      }

      let newMessages = [...messages],
        parsedMessage = Message(message.data);
      if (parsedMessage) {
        newMessages.push(parsedMessage);
      }

      let foundPerson = MyNameIs(message.data);

      if (foundPerson) {
        people.add(foundPerson.name);

        if (foundPerson.host) {
          setHost(foundPerson.name);
        }
      }

      foundPerson = LeftChat(message.data);

      if (foundPerson) {
        people.delete(foundPerson);
      }

      setMessages(newMessages);
    };

    window.addEventListener("beforeunload", leaveChat);

    return () => {
      window.removeEventListener("beforeunload", leaveChat);
    };
  });

  const sendChat = (e) => {
    e.preventDefault();
    socket.send(`${name}: ${text}`);
    setText("");
  };

  const identifySelf = () => {
    socket.send(`My name is ${name}.`);
  };

  const enterChat = (e) => {
    e.preventDefault();
    identifySelf();
    setNameLocked(true);
  };

  const leaveChat = () => {
    socket.send(`${name} has left the chat`);
  };

  return (
    <div className="chat">
      <div className="people">
        <h2>People</h2>
        <ul>
          {[...people].map((person, i) => (
            <li key={i}>
              {person}
              {person === host ? " (host)" : ""}
            </li>
          ))}
        </ul>
      </div>

      {nameLocked ? (
        <div className="messages">
          <h2>Chat messages</h2>
          <ul>
            {messages &&
              messages.map((message, i) => (
                <li key={i}>
                  {message.name}: {message.text}
                </li>
              ))}
          </ul>
          <form onSubmit={sendChat}>
            <label>
              Send message{" "}
              <input
                value={text}
                name="text"
                onChange={(event) => setText(event.target.value)}
              />
            </label>
            <button disabled={text.length < 1}>Send</button>
          </form>
        </div>
      ) : (
        <div className="entry">
          <h2>Enter your name</h2>
          <form onSubmit={enterChat}>
            <label>
              Your name{" "}
              <input
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <button disabled={!name || name.length < 1}>Set name</button>
          </form>
        </div>
      )}
    </div>
  );
}
