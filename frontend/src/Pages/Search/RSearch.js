import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from './Loading';
import { faSearch, faTimesCircle, faArrowLeft, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const RSearch = () => {
    const [URL, setSearchQuery] = useState('');
    const [Result, setSearchResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [keywords, setKeywords] = useState('');
    const [currentTimestamp, setCurrentTimestamp] = useState('');
    const [dynamicDateStart, setDynamicDateStart] = useState('');
    const [dynamicDateEnd, setDynamicDateEnd] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [revsummary, setRevsummary] = useState('');
    const [revaccurl, setRevaccurl] = useState('');
    const [revdescription, setRevdescription] = useState('');
    const [ticketCreated, setTicketCreated] = useState(false);
    const [ticketkey, setTicketKey] = useState('');

    const navigate = useNavigate(); // Use useNavigate hook

    // useEffect(() => {
    //     // Fetch the backend variables when the component mounts
    //     axios.get('http://localhost:5001/dates')
    //         .then(response => {
    //             setCurrentTimestamp(response.data.currentTimestamp);
    //             setDynamicDateStart(response.data.dynamicDateStart);
    //             setDynamicDateEnd(response.data.dynamicDateEnd);
    //         })
    //         .catch(error => console.error('Error fetching dates:', error));
    // }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/dates`)
            .then(response => {
                setCurrentTimestamp(response.data.currentTimestamp);
                setDynamicDateStart(response.data.dynamicDateStart);
                setDynamicDateEnd(response.data.dynamicDateEnd);
            })
            .catch(error => console.error('Error fetching dates:', error));
    }, []);

    const ensureAsterisk = (url) => {
        if (!url.endsWith('*')) {
            return `${url}*`;
        }
        return url;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedURL = ensureAsterisk(URL);
        console.log("Searching reviews for:", formattedURL);

        let apiUrl;
        let requestBody = { Query: formattedURL };

        if (keywords.trim() === '') {
            apiUrl = `${process.env.REACT_APP_BACKEND_URL}/reviewsurl`;
        } else {
            apiUrl = `${process.env.REACT_APP_BACKEND_URL}/reviewskeywords`;
            requestBody.Words = keywords;
        }

        setIsLoading(true);

        axios.post(apiUrl, requestBody)
            .then((response) => {
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    setSearchResult(response.data);
                } else {
                    console.error('Expected an array but received:', response.data);
                    setSearchResult([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setSearchResult([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleClear = () => {
        setSearchQuery('');
        setSearchResult('');
        setKeywords('');
        window.location.reload();
    };

    const handleLogout = () => {
        // Clear session data here, e.g., remove tokens from localStorage or cookies
        localStorage.removeItem('authToken'); // Example for clearing localStorage
        navigate('/'); // Navigate to the login page
    };

    const handleRaiseTicket = () => {
        setRevsummary('DON\'T PICK THIS TICKET');
        setRevaccurl('');
        setRevdescription('\nHi Team, \n\nDON\'T PICK THIS TICKET REVIEW \nLink: ' + URL + '\n\nThank you');
        setIsFormOpen(true); // Open the form
        setTicketCreated(false);
    };

    const handleFormClear = () => {
        setRevsummary('');
        setRevaccurl('');
        setRevdescription('');
        setIsFormOpen(true); // Open the form
    }


    const handleCloseForm = () => {
        setIsFormOpen(false); // Close the form
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reviewticket`, {
                revsummary: revsummary,
                revaccurl: revaccurl,
                revdescription: revdescription
            });
            console.log("Form submitted");
            setTicketCreated(true);
            setTicketKey(response.data.key); 
        } catch (error) {
            console.error("There was an error submitting the ticket!", error);
        }
        handleCloseForm();
    };

    // refreshes page after the ticket is created 
    const refreshpage = () => {
        window.location.href = '/RSearch';
    };

    return (
        <div>
            <div className={`${styles.dateDisplay}`}>
                <p> Start Date : {new Date(dynamicDateStart).toLocaleString()}</p>
                <p> End Date   : {new Date(dynamicDateEnd).toLocaleString()}</p>
            </div>

            {/* Back button */}
            <button onClick={() => window.history.back()} className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>

            {/* Logout button */}
            <button onClick={handleLogout} className={styles.logoutButton}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>

            <form className={styles.searchContainer} onSubmit={handleSubmit}>
                <h2>Search reviews</h2>
                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Enter the source or article URL ...."
                            value={URL}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <br></br>
                        <br></br>
                        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                        <input type="text" placeholder="Enter the keywords ...." value={keywords}
                            onChange={(e) => setKeywords(e.target.value)} className={styles.inputField1} />
                        {URL && (
                            <button type="button" onClick={handleClear} className={styles.clearButton}>
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                        )}
                    </div>
                </div>
                <button type="submit" className={styles.submitButton}>Search</button>

                {/* {isLoading && <LoadingSpinner />} */}

                {Result && !isLoading ? (
                    Array.isArray(Result) && Result.length > 0 ? (
                        <div className={styles.resultContainer}>
                            <h3>Search Result:</h3>
                            {Result.map((doc, index) => (
                                <div key={index} className="document">
                                    <a href={doc.originalUrl} target="_blank" rel="noopener noreferrer"><h3>{doc.body || 'N/A'}</h3></a>
                                    <p>Published Date: {new Date(doc.date).toLocaleString()}</p>
                                    <p>Source: {doc.source}</p>
                                    <p>Source URL: <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer">{doc.sourceUrl}</a></p>
                                    <br /><hr></hr>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !isFormOpen && !ticketCreated && (
                            <div className={styles.resultContainer}>
                                <h3>No Results Found. Would you like to raise a ticket!?</h3>
                                <button type="button" onClick={handleRaiseTicket} className={styles.raiseTicketButton}>Raise a Ticket</button>
                            </div>
                        )
                    )
                ) : (
                    <div className={styles.resultContainer}>
                        <h3>{isLoading && <LoadingSpinner />}</h3>
                    </div>
                )}
            </form>

            {isFormOpen &&  (
                <div className={styles.formOverlay}>
                    <div className={styles.formContainer}>
                        <button onClick={handleCloseForm} className={styles.closeButton}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2>You are raising a ticket for review content!</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className={styles.formGroup}>
                                <label>Summary: *</label> <br></br>
                                <input
                                    type="text"
                                    value={revsummary}
                                    onChange={(e) => setRevsummary(e.target.value)}
                                    className={styles.ticketinput1}
                                    required
                                />
                            </div> <br /><br />
                            <div className={styles.formGroup}>
                                <label>Issue type: *</label> <br />
                                <select className={styles.selectField}>
                                    <option value="support">Support</option>
                                    <option value="Klear-Support" disabled>Klear Support</option>
                                    <option value="Emailed-request" disabled>Emailed request</option>
                                </select>
                            </div> <br /><br />
                            <div className={styles.formGroup}>
                                <label>Account / Opportunity URL: *</label> <br />
                                <input
                                    type="url"
                                    value={revaccurl}
                                    onChange={(e) => setRevaccurl(e.target.value)}
                                    className={styles.ticketinput1}
                                    placeholder='Enter the Account / opportunity URL ....'
                                    required
                                />
                            </div> <br />
                            <div className={styles.formGroup}>
                                <label>Description: *</label> <br />
                                <textarea
                                    value={revdescription}
                                    onChange={(e) => setRevdescription(e.target.value)}
                                    className={styles.ticketinputdes}
                                    required
                                />
                            </div> <br /><br />
                            <div className={styles.formActions}>
                                <button type="reset" className={styles.formclrButton} onClick={handleFormClear}>Clear</button>
                                <button type="submit" className={styles.formsubButton}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {ticketCreated && (
                <div className={styles.resultContainer2}>
                    <h3>Ticket Created Successfully!</h3>
                    <p>
                        Ticket Number: <a href={`https://meltwater.atlassian.net/browse/${ticketkey}`} target="_blank" rel="noopener noreferrer">{ticketkey}</a>
                    </p>
                    <button type="button" onClick={refreshpage} className={styles.formclrButton}>OK</button>
                </div>
            )}
        </div>
    );
};

export default RSearch;