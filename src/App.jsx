import React, { useEffect, useState } from "react";
import "./App.css"; // import the CSS file
import logi from "../src/assets/logi.png";
function App() {
  const [clickedKeys, setClickedKeys] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [messages, setMessages] = useState([
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
  ]);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.52.216:8765");

    socket.addEventListener("open", function (event) {
      socket.send("Hello Server!");
    });

    socket.addEventListener("message", function (event) {
      // When a message is received, update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, event.data]);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // empty dependency array ensures this effect runs only once

  // const handleKeyPress = (event) => {
  //   const digit = event.key;
  //   // Check if the pressed key is a number
  //   if (!isNaN(digit) && digit !== " ") {
  //     const newKey = { id: clickCount + 1, digit, keyCode: event.keyCode };
  //     setClickedKeys((prevClickedKeys) => [...prevClickedKeys, newKey]);
  //     setClickCount((prevCount) => prevCount + 1);
  //   } else {
  //     alert("You clicked a letter instead of a number!");
  //   }
  // };

  return (
    <div className="container" tabIndex={0}>
      <img src={logi} alt="" width="300px" />
      <h1>Amity University Welcomes To You !</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index} className="classBox">
            <h4>{index + 1}</h4>
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
