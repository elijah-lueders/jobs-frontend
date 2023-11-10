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
        // Calculate the number of days since each job was posted and add a new status property
        const currentDate = new Date();
        const updatedJobs = data.map(job => {
          const createdDate = new Date(job.created);
          const daysSincePosted = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24));
          return { ...job, daysSincePosted };
        });
        setJobs(updatedJobs);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // job listings are still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // render a list of job listings
  return (
    <div className="job-listings">
      {jobs.map(job => (
        <div className="job-listing" key={job.id}>
          <p>Company: {job.company.display_name}</p>
          <p>Title: {job.title}</p>
          <p>Salary: ${job.salary_min.toLocaleString()} {job.salary_min !== job.salary_max && `- $${job.salary_max.toLocaleString()}`}</p>
          <p>Days since posted: {job.daysSincePosted}</p>
          <select defaultValue={job.status}>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="none"></option>
          </select>
          <a href={job.redirect_url}>View Job</a>
        </div>
      ))}
    </div>
  );
}

// Export the JobListings component as the default export of the module
export default JobListings;