import React, { useState } from "react";
import Calculator from "./components/Calculator";
import History from "./components/History"; // Import the History component
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]); // State for storing history

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to add an entry to the history
  const addHistoryEntry = (entry) => {
    setHistory([...history, entry]);
  };

  // Function to clear history
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </header>
      <Calculator addHistoryEntry={addHistoryEntry} />
      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
