import React from "react";
import "./App.css";
import Deck from "./Deck";

function App() {
  return (
    <div className="App">
      <h1 className="Deck-title"> Draw a card </h1>
      <h2 className="Deck-title subtitle">
        &#9826; A little demo made with React &#9826;
      </h2>
      <Deck />
    </div>
  );
}

export default App;
