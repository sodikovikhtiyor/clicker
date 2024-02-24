import React, { useState, useEffect } from "react";
import "./Card.css";
const Card = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [num, setNum] = useState([]);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === id.toString()) {
  //       if (!hasBeenClicked) {
  //         setIsClicked(true);
  //         setHasBeenClicked(true);
  //       }
  //     }
  //   };

  //   window.addEventListener("keypress", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keypress", handleKeyPress);
  //   };
  // }, [id, isClicked, hasBeenClicked]);
  // //////////////////////////////////////////////////////////
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.23.216:8765");

    socket.addEventListener("open", function (event) {
      socket.send("Hello Server!");
    });

    socket.addEventListener("message", function (event) {
      // When a message is received, update the messages state with the new message
      if (event.data != 0) {
        // buttonClickAudioRef.current.play();
        setNum((prevMessages) => [...prevMessages, event.data]);
        console.log("Message from server:", event.data);
      }
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div
      className="card"
      style={{ backgroundColor: isClicked ? "blue" : "white" }}
      // onClick={handleClick}
    >
      <span>{id}</span>
      <p>
        Card
        {id}
      </p>
    </div>
  );
};

const CardList = () => {
  return (
    <div className="card-list">
      <div className="column">
        {[...Array(5)].map((_, index) => (
          <Card key={index} id={index + 1} />
        ))}
      </div>
      <div className="column">
        {[...Array(5)].map((_, index) => (
          <Card key={index + 5} id={index + 6} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
