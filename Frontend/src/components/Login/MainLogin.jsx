import React from "react";
import Navbar from "../Patient/Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { FaUserMd, FaUser } from "react-icons/fa"; // Importing icons

const MainLogin = () => {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white py-8 px-4"
        style={{ backgroundImage: 'url("/images/background.jpeg")' }} // Background image from public folder
      >
        <div className="bg-black bg-opacity-70 p-4 md:p-10 rounded-xl shadow-2xl text-center w-full max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Welcome! Who Are You?
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8">
            Choose your role to proceed to the login page. We ensure a smooth
            and secure experience for both doctors and patients.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Doctor Login Card */}
            <div className="w-full md:flex-1 bg-blue-100 text-blue-800 p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <FaUserMd className="text-4xl md:text-6xl mb-3 md:mb-4" />
                <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Doctor</h2>
                <p className="text-center text-xs md:text-sm text-gray-700 mb-4 md:mb-6">
                  Manage patient records, view appointments, and update medical
                  histories.
                </p>
                <Link
                  to="/doctorlogin"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 md:px-6 rounded-full transition-colors duration-300 w-full md:w-auto text-center"
                >
                  Login as Doctor
                </Link>
                {/* Demo Details */}
                <div className="mt-3 md:mt-4 text-xs md:text-sm bg-blue-200 text-blue-700 p-2 md:p-3 rounded-lg w-full">
                  <p className="font-bold">Demo Login Details:</p>
                  <p className="break-all">
                    Email:{" "}
                    <span className="font-mono">geetanshu@gmail.com</span>
                  </p>
                  <p>
                    Password: <span className="font-mono">123456</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Login Card */}
            <div className="w-full md:flex-1 bg-green-100 text-green-800 p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <FaUser className="text-4xl md:text-6xl mb-3 md:mb-4" />
                <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Patient</h2>
                <p className="text-center text-xs md:text-sm text-gray-700 mb-4 md:mb-6">
                  Access your medical records, book appointments, and connect
                  with your doctor.
                </p>
                <Link
                  to="/patientlogin"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 md:px-6 rounded-full transition-colors duration-300 w-full md:w-auto text-center"
                >
                  Login as Patient
                </Link>
                {/* Demo Details */}
                <div className="mt-3 md:mt-4 text-xs md:text-sm bg-green-200 text-green-700 p-2 md:p-3 rounded-lg w-full">
                  <p className="font-bold">Demo Login Details:</p>
                  <p className="break-all">
                    Email: <span className="font-mono">lakshit@gmail.com</span>
                  </p>
                  <p>
                    Password: <span className="font-mono">123456</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLogin;
