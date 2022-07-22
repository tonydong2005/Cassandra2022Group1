import React from 'react';
import './App.css';
import chaselogo from './chaselogo-removebg-preview.png';

function App() {
  return (
    <div id="header">
      <header>
      <h1>JP MORGAN CHASE & CO.</h1>
      <img id = "logo" src={chaselogo} alt="JPMorgan Chase Logo"/>
      </header>
    <section id = "gradient">
    </section>
    <section class = "login">
      <h2>Log In</h2>
    </section>

    </div>

   
  );
}

export default App;