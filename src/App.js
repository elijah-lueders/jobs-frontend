import React from 'react';
import './App.css';
import JobListings from './components/JobListings';

function App() {
  const refreshJobs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/refreshJobs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // You might want to do something with the response here
    } catch (error) {
      console.error('A problem occurred when trying to fetch new jobs:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jobs!</h1>
        <button onClick={refreshJobs}>Refresh Jobs</button>
      </header>
      <JobListings />
    </div>
  );
}

export default App;