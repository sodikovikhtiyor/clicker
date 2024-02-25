import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "../src/assets/logo.png";

function App() {
  const [messages, setMessages] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.233.216:8765");

    socket.addEventListener("open", function (event) {
      socket.send("Hello Server!");
    });

    socket.addEventListener("message", function (event) {
      if (event.data !== "0") {
        const message = parseInt(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
        setOrder((prevOrder) => [...prevOrder, message]);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="container" tabIndex={0}>
      <div className="header">
        <img src={logo} width="300px" alt="Logo" />
        <h1>
          Amity University Welcomes You To International English Olympiad!
        </h1>
      </div>
      <div className="main-body">
        <div className="column">
          {[...Array(5)].map((_, ind) => (
            <div
              key={ind}
              className={`box ${messages.includes(5 - ind) ? "active" : ""}`}
            >
              <span>{5 - ind}th</span>
              {/* <span>{ind + 1}</span> */}
              <div>
                {messages.includes(5 - ind) && (
                  <p>
                    <b>{order.indexOf(5 - ind) + 1}</b> click
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="column">
          {[...Array(5)].map((_, ind) => (
            <div
              key={ind + 5}
              className={`box ${messages.includes(ind + 6) ? "active" : ""}`}
            >
              <span>{ind + 6}th</span>
              <div>
                {messages.includes(ind + 6) && (
                  <p>
                    <b>{order.indexOf(ind + 6) + 1}</b> Click
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
