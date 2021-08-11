import { useState, useEffect } from "react";
const { Message } = require("../parsers/Message");

let socket;

function setupSocket() {
  socket = new WebSocket(`ws://${location.host}`);
}

export default function Chat() {
  const [name, setName] = useState();
  const [nameLocked, setNameLocked] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState({ raw: [], clean: [], people: [] });

  useEffect(() => {
    if (!socket) setupSocket();

    socket.onmessage = (message) => {
      // TODO: see if there's a JS store that will handle this better than setting in-state. (might get memory hoggy)
      let newRaw = [...messages.raw];
      newRaw.push(message.data);

      let newClean = [...messages.clean],
        parsedMessage = Message(message.data);
      if (parsedMessage) {
        newClean.push(parsedMessage);
      }

      let newPeople = [...messages.people];
      let foundPeople;
      foundPeople = message.data.match(/^My name is (?<person>.*)/);

      if (foundPeople) {
        newPeople.push(foundPeople.groups.person);
      }

      setMessages({ raw: newRaw, clean: newClean, people: newPeople });
    };
  });

  const sendChat = (e) => {
    e.preventDefault();
    socket.send(`${name}: ${text}`);
    setText("");
  };

  // For now, we're going to be optimistic here and proceed with the assumption all names will be unique.
  // In the future, we should have a "new entrant" message to poll for names
  const enterChat = (e) => {
    e.preventDefault();
    socket.send(`My name is ${name}`);
    setNameLocked(true);
  };

  return (
    <div>
      <h2>People</h2>
      <ul>
        {messages.people.map((person, i) => (
          <li key={i}>{person}</li>
        ))}
      </ul>

      {nameLocked ? (
        <div>
          <h2>Chat messages</h2>
          {messages.clean &&
            messages.clean.map((message, i) => (
              <p key={i}>
                {message.name}: {message.text}
              </p>
            ))}
          <form onSubmit={sendChat}>
            <label>
              Send message{" "}
              <input
                value={text}
                name="text"
                onChange={(event) => setText(event.target.value)}
              />
            </label>
            {text.length > 0 ? <button>Set name</button> : ""}
          </form>
        </div>
      ) : (
        <div>
          <h2>Enter your name</h2>
          <form onSubmit={enterChat}>
            <label>
              Your name{" "}
              <input
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            {name && name.length > 0 ? <button>Set name</button> : ""}
          </form>
        </div>
      )}
    </div>
  );
}
