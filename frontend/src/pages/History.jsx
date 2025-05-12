import React, { useEffect, useState } from 'react';
import './History.css';
const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Historique</h2>

      {history.length === 0 ? (
        <p className="text-gray-600">Aucune activité enregistrée.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry, index) => (
            <li key={index} className="bg-white p-4 shadow rounded">
              <p className="text-gray-800 font-medium">{entry.action}</p>
              {entry.link && (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline break-all"
                >
                  {entry.link}
                </a>
              )}
              <p className="text-sm text-gray-500 mt-1">{new Date(entry.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
