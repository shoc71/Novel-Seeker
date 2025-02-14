import React, { useState, useEffect } from "react";
import { Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";

const pageNavBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      <div className="container-fluid">
        {/* Title */}
        <a className="navbar-brand fw-bold" href="#">Ctrl Alt Elite -1</a>

        {/* Navbar Links (centered) */}
        <div className="d-flex mx-auto">
          <a className="nav-link text-light mx-3" href="#">Link 1</a>
          <a className="nav-link text-light mx-3" href="#">Link 2</a>
        </div>

        {/* Right Section: Dark Mode Toggle & Profile */}
        <div className="d-flex align-items-center gap-3">
          {/* Dark Mode Button */}
          <button
            className="btn btn-outline-light"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Button */}
          <Link to="/login">
            <button className="btn btn-primary">
              <User size={20} />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default pageNavBar