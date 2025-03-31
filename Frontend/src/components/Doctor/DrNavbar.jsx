import React, { useState, useEffect } from "react";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserMd, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

function DrNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { key: "home", to: "/doc", label: "Home", icon: <FaHome /> },
    { key: "about", to: "/aboutme", label: "About", icon: <FaUserMd /> },
    { key: "appointment", to: "/todayAppointment", label: "Appointments", icon: <FaCalendarAlt /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blue-600 shadow-lg' : 'bg-blue-500'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/doc" className="text-white text-2xl md:text-3xl font-bold flex items-center">
              <span className="animate__animated animate__tada" style={{ animationDuration: "2s", animationIterationCount: "1" }}>
                My Clinic
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className="text-white hover:text-blue-100 flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              disabled={isLoggingOut}
            >
              <FaSignOutAlt />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-100 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="text-white hover:text-blue-100 flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-200"
            disabled={isLoggingOut}
          >
            <FaSignOutAlt />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DrNavbar;
