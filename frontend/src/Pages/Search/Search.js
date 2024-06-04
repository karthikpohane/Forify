// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './styles.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import LoadingSpinner from './Loading'; // Import the loading spinner component
// import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// const Search = () => {
//     const [URL, setSearchQuery] = useState('');
//     const [Result, setSearchResult] = useState('');
//     const [SelectedOption, setSelectedOption] = useState('forums');
//     const [isLoading, setIsLoading] = useState(false); // Add loading state

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log("Searching", SelectedOption, "for:", URL);

//         const domain = URL.replace(/^(https?:\/\/)?(www\.)?/, '');

//         let apiUrl;
//         if (SelectedOption === 'forums') {
//             apiUrl = 'http://localhost:5001/forumscheck';
//         } else {
//             apiUrl = 'http://localhost:5001/reviewscheck';
//         }

//         // Set loading to true before making the API call
//         setIsLoading(true);

//         axios.post(apiUrl, {
//             Query: domain
//         }).then((response) => {
//             console.log("API Response:", response.data);
//             setSearchResult(response.data);
//         }).catch((error) => {
//             console.error("There was an error with the request!", error);
//         }).finally(() => {
//             // Set loading to false after API call is completed
//             setIsLoading(false);
//         });
//     };

//     const handleClear = () => {
//         setSearchQuery('');
//         setSearchResult('');
//         window.location.reload(); // Refresh the page
//     };

//     return (
//         <div>
//             <form className={styles.searchContainer} onSubmit={handleSubmit}>
//                 <h2>Search source or article</h2>
//                 <div className={styles.inputGroup}>
//                     <select
//                         className={styles.selectField}
//                         value={SelectedOption}
//                         onChange={(e) => setSelectedOption(e.target.value)}
//                     >
//                         <option value="forums">Forums</option>
//                         <option value="reviews">Reviews</option>
//                     </select>
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

//                 {/* Conditional rendering for loading spinner */}
//                 {isLoading && <LoadingSpinner />}

//                 {/* Conditional rendering for search result */}
//                 {Result && !isLoading && (
//                     <div className={styles.resultContainer}>
//                         <h3>Search Result:</h3>
//                         <pre>{JSON.stringify(Result, null, 2)}</pre>
                        
//                     </div>
//                 )}
//                 {/* {Result.length > 0 ? (
//                     <div className={styles.resultContainer}>
//                         <h3>Results found</h3><hr></hr>
//                         {Result.map((doc, index) => (
//                             <div key={index} className="document">
//                                 <a href={doc.originalUrl} target="_blank" rel="noopener noreferrer"><h3>{doc.body || 'N/A'}</h3></a>
//                                 <p>Published Date: {new Date(doc.date).toLocaleString()}</p>
//                                 <p>Source: {doc.source}</p>
//                                 <p>Source URL: <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer">{doc.sourceUrl}</a></p>
//                                 <br/><hr></hr>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div>
//                         <h3>Result not found</h3>
//                     </div>
//                 )} */}
//             </form>
//         </div>
//     );
// };

// export default Search;
