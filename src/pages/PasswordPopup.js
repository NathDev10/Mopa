import React, { useState } from 'react';
import '../Style.css'; // Assurez-vous d'importer votre fichier CSS

const PasswordPopup = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
          <h2>Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
    </div>
  );
};

export default PasswordPopup;