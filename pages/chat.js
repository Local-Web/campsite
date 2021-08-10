import { useState } from "react";

export default function Chat() {
  const [name, setName] = useState();

  // go to the next page with the username prefilled or something?
  // use localStorage?
  // is this where we enter the chat first, then ask for a username? maybe?
  const enterChat = () => {};

  return (
    <div>
      {
        // this won't work because as soon as you set the name, it disappears!
      }
      {name ? (
        ""
      ) : (
        <div>
          <label>
            Your name{" "}
            <input
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
}
