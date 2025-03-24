import React from 'react';
import './Button.css';

function Button({ onClick }) {
  return (
    <button className="get-started-button" onClick={onClick}>
      Get Started
    </button>
  );
}

export default Button;
