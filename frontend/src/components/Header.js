import React from 'react';
import { Link } from 'react-router-dom';
import canadaIcon from '../styles/CanadaLeaf.jpg';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header style={styles.header}>
      <img src={canadaIcon} alt="Canada Icon" style={styles.canadaIcon} />
      <h1 style={styles.title}>Canada Weather</h1>

      <nav>
        <ul style={styles.navList}>
          <li><Link to="/" style={styles.navLink}>Home</Link></li>
          <li><Link to="/about" style={styles.navLink}>About</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login" style={styles.navLink}>Login</Link></li>
              <li><Link to="/signup" style={styles.navLink}>Signup</Link></li>
            </>
          ) : (
            <li>
              <button onClick={onLogout} style={styles.navLink}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#003366',
    color: 'white',
  },
  title: {
    fontSize: '1.5rem',
    marginLeft: '10px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  canadaIcon: {
    width: '40px',
    height: '40px',
  },
};

export default Header;
