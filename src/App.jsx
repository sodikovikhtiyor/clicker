import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "../src/assets/logo.png";
import soundFile from "../src/assets/sound.wav";

function App() {
  const [messages, setMessages] = useState([]);
  const [playAudio, setPlayAudio] = useState(false);
  const [order, setOrder] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.23.216:8765");

    socket.addEventListener("open", function (event) {
      socket.send("Hello Server!");
    });

    socket.addEventListener("message", function (event) {
      if (event.data !== "0") {
        const message = parseInt(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
        setOrder((prevOrder) => [...prevOrder, message]);
        setPlayAudio(true); // Set playAudio to true whenever a message is received
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (playAudio) {
      audioRef.current.play();
      setPlayAudio(false); // Reset playAudio to false after playing audio
    }
  }, [playAudio]);

  const handleButtonClick = () => {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current.play();
  };

  return (
    <div className="container" tabIndex={0}>
      <div className="header">
        <img src={logo} width="300px" alt="Logo" />
        <h1>
          Amity University Welcomes You To International English Olympiad!
        </h1>
      </div>
      <audio ref={audioRef} src={soundFile} />
      <button onClick={handleButtonClick} style={{ display: "none" }}></button>
      <div className="main-body">
        <div className="column">
          {[...Array(5)].map((_, ind) => (
            <div
              key={ind}
              className={`box ${messages.includes(5 - ind) ? "active" : ""}`}
            >
              <span>{5 - ind}th</span>
              <div>
                {messages.includes(5 - ind) && (
                  <p>{order.indexOf(5 - ind) + 1} click</p>
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
              <span>{ind + 6}</span>Card
              <div>
                {messages.includes(ind + 6) && (
                  <p>{order.indexOf(ind + 6) + 1}</p>
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
