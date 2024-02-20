import React, { useState } from "react";

function App() {
  const [clickedKeys, setClickedKeys] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const handleKeyPress = (event) => {
    const digit = event.key;
    // Check if the pressed key is a number
    if (!isNaN(digit) && digit !== " ") {
      const newKey = { id: clickCount + 1, digit, keyCode: event.keyCode };
      setClickedKeys((prevClickedKeys) => [...prevClickedKeys, newKey]);
      setClickCount((prevCount) => prevCount + 1);
    } else {
      alert("You clicked a letter instead of a number!");
    }
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyPress}>
      <h1>Press me to start</h1>
      {clickedKeys.length > 0 && (
        <ul>
          {clickedKeys.map((key, index) => (
            <li key={key.id}>{`ID: ${key.id}, You pressed: ${key.digit}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
