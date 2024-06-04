// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './styles.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import LoadingSpinner from './Loading';
// import { faSearch, faTimesCircle, faArrowLeft, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons

// const FSearch = () => {
//     const [URL, setSearchQuery] = useState('');
//     const [Result, setSearchResult] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [currentTimestamp, setCurrentTimestamp] = useState('');
//     const [dynamicDateStart, setDynamicDateStart] = useState('');
//     const [dynamicDateEnd, setDynamicDateEnd] = useState('');
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [forsummary, setForsummary] = useState('');
//     const [foraccurl, setForaccurl] = useState('');
//     const [fordescription, setFordescription] = useState('');
//     const [ticketCreated, setTicketCreated] = useState(false);
//     const [ticketkey, setTicketKey] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch all dates from the backend
//                 const response = await axios.get('http://localhost:5001/dates');
//                 const { currentTimestamp, dynamicDateStart, dynamicDateEnd } = response.data;
//                 setCurrentTimestamp(new Date(currentTimestamp).toLocaleString());
//                 setDynamicDateStart(new Date(dynamicDateStart).toLocaleString());
//                 setDynamicDateEnd(new Date(dynamicDateEnd).toLocaleString());
//             } catch (error) {
//                 console.error('Error fetching dates:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log("Searching forums for:", URL);

//         const domain = URL.replace(/^(https?:\/\/)?(www\.)?/, '');

//         const apiUrl = 'http://localhost:5001/forumscheck';

//         setIsLoading(true);

//         try {
//             const response = await axios.post(apiUrl, { Query: domain });
//             console.log("API Response:", response.data);
//             setSearchResult(response.data);
//         } catch (error) {
//             console.error("There was an error with the request!", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleClear = () => {
//         setSearchQuery('');
//         setSearchResult('');
//         window.location.reload();
//     };

//     const handleLogout = () => {
//         // Clear session data here, e.g., remove tokens from localStorage or cookies
//         localStorage.removeItem('authToken'); // Example for clearing localStorage
//         window.location.href = '/'; // Redirect to the login page
//     };

//     const handleRaiseTicket = () => {
//         setForsummary('DON\'T PICK THIS TICKET');
//         setFordescription('\nHi Team, \n\nDON\'T PICK THIS TICKET FORUM \nLink: ' + URL + '\n\nThank you');
//         setForaccurl('');
//         setIsFormOpen(true); // Open the form
//         setTicketCreated(false);
//     };

//     const handleFormClear = () => {
//         setForsummary('');
//         setForaccurl('');
//         setFordescription('');
//         setIsFormOpen(true); // Open the form
//     }

//     const handleCloseForm = () => {
//         setIsFormOpen(false); // Close the form
//         // setTicketCreated(false);
//     };

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5001/forumticket', {
//                 forsummary: forsummary,
//                 foraccurl: foraccurl,
//                 fordescription: fordescription
//             });
//             console.log("Form submitted");
//             setTicketCreated(true);
//             setTicketKey(response.data.key); 
//         } catch (error) {
//             console.error("There was an error submitting the ticket!", error);
//         }
//         handleCloseForm();
//     };

//     // refreshes page after the ticket is created 
//     const refreshpage = () => {
//         window.location.href = '/FSearch';
//     };

//     return (
//         <div>
//             <div className={`${styles.dateDisplay}`}>
//                 <p> Start Date : {dynamicDateStart}</p>
//                 <p> End Date    : {dynamicDateEnd}</p>
//             </div>

//             {/* Back button */}
//             <button onClick={() => window.history.back()} className={styles.backButton}>
//                 <FontAwesomeIcon icon={faArrowLeft} /> Back
//             </button>

//             {/* Logout button */}
//             <button onClick={handleLogout} className={styles.logoutButton}>
//                 <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//             </button>

//             <form className={styles.searchContainer} onSubmit={handleSubmit}>
//                 <h2>Search forums</h2>
//                 <div className={styles.inputGroup}>
//                     <div className={styles.inputWrapper}>
//                         <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
//                         <input
//                             type="text"
//                             placeholder="Enter the source or article URL ...."
//                             value={URL}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className={styles.inputField}
//                             required
//                         />
//                         {URL && (
//                             <button type="button" onClick={handleClear} className={styles.clearButton}>
//                                 <FontAwesomeIcon icon={faTimesCircle} />
//                             </button>
//                         )}
//                     </div>
//                 </div>
//                 <button type="submit" className={styles.submitButton}>Search</button>

//                 {/* {isLoading && <LoadingSpinner />} */}

//                 {Result && !isLoading ? (
//                     Array.isArray(Result) && Result.length > 0 ? (
//                         <div className={styles.resultContainer}>
//                             <h3>Search Result:</h3>
//                             {Result.map((doc, index) => (
//                                 <div key={index} className="document">
//                                     <a href={doc.originalUrl} target="_blank" rel="noopener noreferrer"><h3>{doc.body || 'N/A'}</h3></a>
//                                     <p>Published Date: {new Date(doc.date).toLocaleString()}</p>
//                                     <p>Source: {doc.source}</p>
//                                     <p>Source URL: <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer">{doc.sourceUrl}</a></p>
//                                     <br /><hr></hr>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         !isFormOpen && !ticketCreated && (
//                             <div className={styles.resultContainer}>
//                                 <h3>No Results Found. Would you like to raise a ticket!?</h3>
//                                 <button type="button" onClick={handleRaiseTicket} className={styles.raiseTicketButton}>Raise a Ticket</button>
//                             </div>
//                         )
//                     )
//                 ) : (
//                     <div className={styles.resultContainer}>
//                         <h3>{isLoading && <LoadingSpinner />}</h3>
//                     </div>
//                 )}
//             </form>

//             {isFormOpen && (
//                 <div className={styles.formOverlay}>
//                     <div className={styles.formContainer}>
//                         <br /><br />
//                         <button onClick={handleCloseForm} className={styles.closeButton}>
//                             <FontAwesomeIcon icon={faTimes} />
//                         </button>
//                         <h2>You are raising a ticket for Forum content!</h2>
//                         <form onSubmit={handleFormSubmit}>
//                             <div className={styles.formGroup}>
//                                 <label>Summary:</label> <br></br>
//                                 <input
//                                     type="text"
//                                     value={forsummary}
//                                     onChange={(e) => setForsummary(e.target.value)}
//                                     className={styles.ticketinput1}
//                                     required
//                                 />
//                             </div> <br /><br />
//                             <div className={styles.formGroup}>
//                                 <label>Issue type:</label> <br />
//                                 <select className={styles.selectField}>
//                                     <option value="support">Support</option>
//                                     <option value="Klear-Support" disabled>Klear Support</option>
//                                     <option value="Emailed-request" disabled>Emailed request</option>
//                                 </select>
//                             </div> <br /><br />
//                             <div className={styles.formGroup}>
//                                 <label>Account / Opportunity URL:</label> <br />
//                                 <input
//                                     type="url"
//                                     value={foraccurl}
//                                     onChange={(e) => setForaccurl(e.target.value)}
//                                     className={styles.ticketinput1}
//                                     placeholder='Enter the Account / opportunity URL ....'
//                                     required
//                                 />
//                             </div> <br />
//                             <div className={styles.formGroup}>
//                                 <label>Description:</label> <br />
//                                 <textarea
//                                     value={fordescription}
//                                     onChange={(e) => setFordescription(e.target.value)}
//                                     className={styles.ticketinputdes}
//                                     required
//                                 />
//                             </div> <br /><br />
//                             <div className={styles.formActions}>
//                                 <button type="reset" className={styles.formclrButton} onClick={handleFormClear}>Clear</button>
//                                 <button type="submit" className={styles.formsubButton}>Create</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {ticketCreated && (
//                 <div className={styles.resultContainer2}>
//                     <h3>Ticket Created Successfully!</h3>
//                     <p>
//                         Ticket Number: <a href={`https://meltwater.atlassian.net/browse/${ticketkey}`} target="_blank" rel="noopener noreferrer">{ticketkey}</a>
//                     </p>
//                     <button type="button" onClick={refreshpage} className={styles.formclrButton}>OK</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FSearch;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from './Loading';
import { faSearch, faTimesCircle, faArrowLeft, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons

const FSearch = () => {
    const [URL, setSearchQuery] = useState('');
    const [Result, setSearchResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentTimestamp, setCurrentTimestamp] = useState('');
    const [dynamicDateStart, setDynamicDateStart] = useState('');
    const [dynamicDateEnd, setDynamicDateEnd] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [forsummary, setForsummary] = useState('');
    const [foraccurl, setForaccurl] = useState('');
    const [fordescription, setFordescription] = useState('');
    const [ticketCreated, setTicketCreated] = useState(false);
    const [ticketkey, setTicketKey] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
                const response = await axios.get(`${backendUrl}/dates`);
                const { currentTimestamp, dynamicDateStart, dynamicDateEnd } = response.data;
                setCurrentTimestamp(new Date(currentTimestamp).toLocaleString());
                setDynamicDateStart(new Date(dynamicDateStart).toLocaleString());
                setDynamicDateEnd(new Date(dynamicDateEnd).toLocaleString());
            } catch (error) {
                console.error('Error fetching dates:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Searching forums for:", URL);

        const domain = URL.replace(/^(https?:\/\/)?(www\.)?/, '');

        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/forumscheck`, { Query: domain });
            console.log("API Response:", response.data);
            setSearchResult(response.data);
        } catch (error) {
            console.error("There was an error with the request!", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        setSearchResult('');
        window.location.reload();
    };

    const handleLogout = () => {
        // Clear session data here, e.g., remove tokens from localStorage or cookies
        localStorage.removeItem('authToken'); // Example for clearing localStorage
        window.location.href = '/'; // Redirect to the login page
    };

    const handleRaiseTicket = () => {
        setForsummary('DON\'T PICK THIS TICKET');
        setFordescription('\nHi Team, \n\nDON\'T PICK THIS TICKET FORUM \nLink: ' + URL + '\n\nThank you');
        setForaccurl('');
        setIsFormOpen(true); // Open the form
        setTicketCreated(false);
    };

    const handleFormClear = () => {
        setForsummary('');
        setForaccurl('');
        setFordescription('');
        setIsFormOpen(true); // Open the form
    }

    const handleCloseForm = () => {
        setIsFormOpen(false); // Close the form
        // setTicketCreated(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
            const response = await axios.post(`${backendUrl}/forumticket`, {
                forsummary: forsummary,
                foraccurl: foraccurl,
                fordescription: fordescription
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
        window.location.href = '/FSearch';
    };

    return (
        <div>
            <div className={`${styles.dateDisplay}`}>
                <p> Start Date : {dynamicDateStart}</p>
                <p> End Date    : {dynamicDateEnd}</p>
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
                <h2>Search forums</h2>
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

            {isFormOpen && (
                <div className={styles.formOverlay}>
                    <div className={styles.formContainer}>
                        <br /><br />
                        <button onClick={handleCloseForm} className={styles.closeButton}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2>You are raising a ticket for Forum content!</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className={styles.formGroup}>
                                <label>Summary:</label> <br></br>
                                <input
                                    type="text"
                                    value={forsummary}
                                    onChange={(e) => setForsummary(e.target.value)}
                                    className={styles.ticketinput1}
                                    required
                                />
                            </div> <br /><br />
                            <div className={styles.formGroup}>
                                <label>Issue type:</label> <br />
                                <select className={styles.selectField}>
                                    <option value="support">Support</option>
                                    <option value="Klear-Support" disabled>Klear Support</option>
                                    <option value="Emailed-request" disabled>Emailed request</option>
                                </select>
                            </div> <br /><br />
                            <div className={styles.formGroup}>
                                <label>Account / Opportunity URL:</label> <br />
                                <input
                                    type="url"
                                    value={foraccurl}
                                    onChange={(e) => setForaccurl(e.target.value)}
                                    className={styles.ticketinput1}
                                    placeholder='Enter the Account / opportunity URL ....'
                                    required
                                />
                            </div> <br />
                            <div className={styles.formGroup}>
                                <label>Description:</label> <br />
                                <textarea
                                    value={fordescription}
                                    onChange={(e) => setFordescription(e.target.value)}
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

export default FSearch;
