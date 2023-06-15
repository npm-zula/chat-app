import "./App.css";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h1>Join a CHAT</h1>
      <input
        type="text"
        placeholder="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      ></input>
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}

export default App;
