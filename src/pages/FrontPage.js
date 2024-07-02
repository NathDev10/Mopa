import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FrontPage() {
  const navigate = useNavigate();

    const enterSite = () => {
       navigate('/newhome')
    };

  return (
    <div className="FrontPage">
        <h1 className="title">SayMyStory</h1>
        <p className="subtitle">Votre histoire telle que vous l'avez toujours rêvée...</p>
        <button className="enter-button" onClick={enterSite}>Entrer</button>
        <p className="confirmation">Je confirme que j'ai plus de 18 ans</p>
  </div>
  );
}


