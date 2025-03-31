import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaSpinner, FaTimes, FaArrowLeft } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com/patient/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Please check your email for the reset link.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-4 px-2">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 md:p-8 relative mx-2">
        {/* Close Button */}
        <Link
          to="/"
          className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <FaTimes className="text-xl md:text-2xl" />
        </Link>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
            Forgot Password
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 mb-4 rounded-lg border-l-4 ${
              message.includes("check your email")
                ? "bg-green-50 border-green-500 text-green-700"
                : "bg-red-50 border-red-500 text-red-700"
            }`}
          >
            <p className="text-sm md:text-base">{message}</p>
          </div>
        )}

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold text-sm md:text-base mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm md:text-base"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-600 transition-all duration-300 flex items-center justify-center ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-4 md:mt-6 text-center">
          <Link
            to="/patientlogin"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm md:text-base">
              Remembered your password? Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
