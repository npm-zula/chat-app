import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        message: currentMessage,
        author: username,
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      // setMessageList([...messageList, data]);
      // setMessageList((list) => [...list, messageData]);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="chat-window bg-rose-100 rounded-lg shadow-lg text-gray-900 h-96">
        <div className="chat-header bg-rose-500 text-white py-2 px-4 rounded-t-lg">
          <p className="text-lg font-bold">
            Live Chat <span>{username}</span>
          </p>
        </div>
        <div className="chat-body py-4 px-6 overflow-y-auto h-72">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              const isCurrentUser = username === messageContent.author;

              return (
                <div
                  className={`message flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`message-content p-2 rounded-lg ${
                      isCurrentUser
                        ? "bg-rose-300 text-white ml-4"
                        : "bg-white text-gray-900 mr-4"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    <p>{messageContent.message}</p>
                    <div className="flex justify-end mt-2 text-xs text-gray-700">
                      <p className="mr-1">{messageContent.author}</p>
                      <p>{messageContent.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer bg-rose-500 py-2 px-4 rounded-b-lg flex">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            className="flex-grow py-2 px-4 rounded-md border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-white text-rose-500 font-bold rounded-md hover:bg-rose-200"
          >
            &#9658;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
