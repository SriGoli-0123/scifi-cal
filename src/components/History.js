import React from 'react';
import './History.css';

const History = ({ history, onClearHistory }) => {
  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Calculation History</h2>
        <button className="clear-history-button" onClick={onClearHistory}>
          Clear History
        </button>
      </div>
      <ul className="history-list">
        {history.length > 0 ? (
          history.map((entry, index) => (
            <li key={index} className="history-item">
              {entry.expression} = <strong>{entry.result}</strong>
            </li>
          ))
        ) : (
          <li className="history-item empty">No history available</li>
        )}
      </ul>
    </div>
  );
};

export default History;
