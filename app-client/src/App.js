// import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!showChat ? (
        <div className="w-full max-w-sm bg-rose-200 rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-4 text-center text-rose-400">
            Join a Chat
          </h1>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-rose-400 mb-4"
          ></input>
          <input
            type="text"
            placeholder="Room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-rose-400 mb-4"
          ></input>
          <button
            onClick={joinRoom}
            className="w-full bg-rose-300 text-white font-bold py-2 rounded-md hover:bg-rose-400"
          >
            Join
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
