import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

/**
 * NavBar component.
 *
 * @param {Object} props
 * @param {boolean} props.isDarkMode
 * @param {Function} props.toggleTheme 
 * @param {boolean} [props.isLoggedIn]
 */
function NavBar({ isDarkMode, toggleTheme, isLoggedIn }) {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    // If not logged in, redirect to login page.
    // Otherwise, you might choose to do nothing or log out.
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-primary' : 'navbar-dark bg-primary'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ fontSize: '2rem' }}>
          <img
            src="https://shorturl.at/lepSy" 
            alt="Logo"
            width="25"
            height="25"
            className="d-inline-block align-top me-2"
          />
          <b>Mystery Orbs</b>
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/browse" style={{ fontSize: '1.7rem' }}>
                Browse
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-me" style={{ fontSize: '1.7rem' }}>
                Book Link 2
              </Link>
            </li>
            {/* Auth Button */}
            <li className="nav-item d-flex align-items-center">
              <button
                className="btn btn-link nav-link"
                onClick={handleAuthClick}
                title={isLoggedIn ? 'Logged in' : 'Go to Login'}
              >
                {isLoggedIn ? (
                  <i className="bi bi-check-circle" style={{ fontSize: '1.7rem' }}></i>
                ) : (
                  <i className="bi bi-person" style={{ fontSize: '1.7rem' }}></i>
                )}
              </button>
            </li>
          </ul>
          <button
            className={`btn ${isDarkMode ? 'btn-light' : 'btn-light'}`}
            onClick={toggleTheme}
          >
            {isDarkMode ? <i className="bi bi-moon"></i> : <i className="bi bi-sun"></i>}
          </button>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

export default NavBar;
