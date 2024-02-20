import React, { useState } from "react";

function App() {
  const [clickedKeys, setClickedKeys] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const handleKeyPress = (event) => {
    const digit = event.key;
    const newKey = { id: clickCount + 1, digit, keyCode: event.keyCode };
    setClickedKeys((prevClickedKeys) => [...prevClickedKeys, newKey]);
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyPress}>
      <h1>Press any key</h1>
      {clickedKeys.length > 0 && (
        <ul>
          {clickedKeys.map((key, index) => (
            <li key={key.id}>{`${key.id}: your ID-${key.digit}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
