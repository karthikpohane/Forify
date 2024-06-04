import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [issuelst, setIssuelst] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [issuesFetched, setIssuesFetched] = useState(false);

  const goToSearch = (category) => {
    if (category === 'forums') {
      navigate('/FSearch');
    } else if (category === 'reviews') {
      navigate('/RSearch');
    }
  };

  const getissues = () => {
    setIsFetching(true);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/gettickets`)
      .then(response => {
        setIssuelst(response.data);
        setIsFetching(false);
        setIssuesFetched(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsFetching(false);
        setIssuesFetched(true);
      });
  };

  const refreshpg = () => {
    window.location.href = '/home';
  }


  const handleLogout = () => {
    // Clear session data or perform any additional logout logic here
    sessionStorage.removeItem('token'); // Remove token from sessionStorage
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <div className={styles.logout_btn}>

      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      {/* Add FSearch and RSearch components here */}

      <div className={styles.container}>
    <button className={styles.button} onClick={() => goToSearch('forums')}>Forums</button>
    <button className={styles.button} onClick={() => goToSearch('reviews')}>Reviews</button>
    <button className={styles.issbutton} onClick={getissues}>Issues History</button>
    <div className={styles.logsContainer}>
        {isFetching ? (
            <p>Loading issues...</p>
        ) : issuesFetched && issuelst.length > 0 ? (
            <div>
                <ol className="issue-list">
                    {issuelst.map((issue, index) => (
                        <a href={`https://meltwater.atlassian.net/browse/${issue}`} target="_blank" rel="noopener noreferrer" key={index} className="issue-link">
                            <li className="issue-item">{issue}</li>
                        </a>
                    ))}
                </ol>
                <button className={styles.issbutton} onClick={refreshpg}>OK</button>
            </div>
        ) : issuesFetched && issuelst.length === 0 ? (
            <div>
                <p>No issues available</p>
                <button onClick={refreshpg}>OK</button>
            </div>
        ) : (
            <p></p>
        )}
    </div>
</div>




      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Meltwater. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;