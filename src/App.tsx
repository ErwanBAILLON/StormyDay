import React from 'react';
import './App.css';
import { Weather } from './weather/Weather';

function App() {

  return (
    <div className="App">
      <div>
        <h1>StormyDay App</h1>
      </div>
      <Weather />
    </div>
  );
}

export default App;