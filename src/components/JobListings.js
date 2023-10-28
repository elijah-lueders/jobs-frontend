// Import React, useState, and useEffect from the 'react' module
import React, { useState, useEffect } from 'react';
import './JobListings.css';

// Define a component called JobListings
function JobListings() {
  // Define state variables for the job listings and loading status
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the useEffect hook to fetch the job listings from the server when the component is mounted
  useEffect(() => {
    fetch('http://localhost:5001/api/jobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // If the job listings are still loading, render a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Otherwise, render a list of job listings
  return (
    <div className="job-listings">
      {jobs.map(job => (
        <div className="job-listing" key={job.id}>
          <p>Company: {job.company.display_name}</p>
          <p>Salary: {job.salary_min} - {job.salary_max}</p>
          <a href={job.redirect_url}>View Job</a>
        </div>
      ))}
    </div>
  );
}

// Export the JobListings component as the default export of the module
export default JobListings;