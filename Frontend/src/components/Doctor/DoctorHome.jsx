import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFilePrescription,
  FaComments,
  FaVideo,
  FaPhoneAlt,
  FaFileMedical,
  FaUserMd,
  FaStethoscope,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaCalendarAlt,
} from "react-icons/fa";

import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

const DoctorHome = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get doctor data from localStorage
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    if (doctorData && doctorData.fullName) {
      setFullName(doctorData.fullName); // Set the fullName state
    }
    // Trigger fade-in animation
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <FaUserMd className="text-3xl text-blue-500" />,
      title: "General Consultation",
      description: "Comprehensive health examinations for all ages.",
    },
    {
      icon: <FaStethoscope className="text-3xl text-green-500" />,
      title: "Specialized Care",
      description: "Expert treatment for specific health conditions.",
    },
    {
      icon: <FaHeartbeat className="text-3xl text-red-500" />,
      title: "Emergency Care",
      description: "24/7 emergency medical services available.",
    },
    {
      icon: <FaHandHoldingHeart className="text-3xl text-purple-500" />,
      title: "Wellness Programs",
      description: "Preventive care and wellness initiatives.",
    },
  ];

  return (
    <>
      <DrNavbar />
      <div className="pt-16"> {/* Add padding for fixed navbar */}
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Welcome, Dr. {fullName || "Guest"}!
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-6">
                  Providing exceptional care to keep your patients healthy and happy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/medical-records"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaFileMedical />
                    Medical Records
                  </Link>
                  <Link
                    to="/patient-communication"
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaComments />
                    Chat with Patients
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/images/hero.jpg"
                  alt="A welcoming view of the clinic"
                  className="w-full h-auto rounded-lg shadow-2xl transform transition duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive healthcare services to ensure the best care for your patients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Our Clinic
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                At My Clinic, we specialize in personalized healthcare tailored to
                your patients' needs. Our experienced team provides a wide range of services
                including general consultations, specialized treatments, and health
                checkups. We prioritize patient well-being and strive to ensure they
                receive the best care possible.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Access your most frequently used features quickly and efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                to="/todayAppointment"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <FaCalendarAlt className="text-3xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Today's Appointments</h3>
                <p className="text-gray-600">View and manage your daily schedule</p>
              </Link>
              <Link
                to="/patient-communication"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <FaComments className="text-3xl text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Patient Communication</h3>
                <p className="text-gray-600">Chat with your patients</p>
              </Link>
              <Link
                to="/medical-records"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <FaFileMedical className="text-3xl text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Medical Records</h3>
                <p className="text-gray-600">Access and update patient records</p>
              </Link>
              <Link
                to="/emergency"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <FaPhoneAlt className="text-3xl text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Emergency Cases</h3>
                <p className="text-gray-600">Handle urgent medical situations</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorHome;
