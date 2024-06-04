import React from 'react';
import Login from './Login'; 
import styles from "./styles.module.css";
// import logo from './path/to/your/logo.png'; // Update the path to your logo image

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                {/* <img src={logo} alt="Logo" className={styles.logo} /> */}
            </div>
            <div className={styles.contentContainer} style={{alignItems: 'center'}}>
                <h1 className={styles.heading}> FORIFY</h1>
                <p className={styles.description}>Sign in to access your account and explore the tool.</p>
                <div className={styles.ssoContainer}>
                    <Login /> {/* Render the Login component */}
                </div>
            </div>
            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Meltwater. All rights reserved.
            </footer>
        </div>
    );
}

export default LoginPage;
