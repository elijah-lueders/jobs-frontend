import React from 'react';
import './App.css';
import JobListings from './components/JobListings';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jobs!</h1>
      </header>
      <JobListings />
    </div>
  );
}

export default App;
