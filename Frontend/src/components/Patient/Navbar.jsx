import React, { useState, useEffect } from "react";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Logout";

function Navbar() {
  const navItems = [
    <li key="home" className="hover:text-blue-200 transition-colors duration-200">
      <Link to="/">Home</Link>
    </li>,
    <li key="about" className="hover:text-blue-200 transition-colors duration-200">
      <Link to="/about">About</Link>
    </li>,
    <li key="appointment" className="hover:text-blue-200 transition-colors duration-200">
      <Link to="/patient-portal">Appointments</Link>
    </li>,
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setIsLoggingOut(true);
      localStorage.removeItem("token");
      localStorage.clear();
      alert("You have been logged out successfully!");
      navigate("/mainlogin");
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className={`bg-blue-500 w-full h-16 flex justify-between items-center fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg bg-opacity-95' : 'bg-opacity-90'
      }`}>
        <div className="flex items-center">
          <div
            className="text-white text-2xl md:text-3xl font-bold p-4 animate__animated animate__tada"
            style={{ animationDuration: "2s", animationIterationCount: "1" }}
          >
            <Link to="/" className="hover:text-blue-200 transition-colors duration-200">
              My Clinic
            </Link>
          </div>
        </div>

        {/* Hamburger Menu Icon for mobile */}
        <div className="lg:hidden mobile-menu-container">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          <div className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}>
            <ul className="py-2">
              {navItems.map((item) => (
                <li key={item.key} className="px-4 py-2 hover:bg-blue-50 transition-colors duration-200">
                  {item}
                </li>
              ))}
              <li className="px-4 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 px-4">
          <ul className="flex space-x-8 items-center">
            {navItems}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
