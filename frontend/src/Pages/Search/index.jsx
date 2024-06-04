// SearchPage.jsx
import React from 'react';
//import axios from 'axios';
import Search from './Search';
import styles from './styles.module.css';

const SearchPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <div>
                    <Search />
                </div>

            </div>
            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Meltwater. All rights reserved.
            </footer>
        </div>
    );
        
};

export default SearchPage;
