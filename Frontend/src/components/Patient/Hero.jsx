import React, { useEffect, useState } from "react";
import { FaStethoscope, FaPills, FaHeartbeat, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get patient data from localStorage
    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (patientData && patientData.fullName) {
      setFullName(patientData.fullName);
    }
    // Trigger fade-in animation
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:justify-between gap-8">
          {/* Left Section */}
          <div className={`w-full md:w-1/2 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl text-gray-800 font-bold mb-4 md:mb-6">
              Welcome <span className="text-blue-600">{fullName || "Guest"}</span> to{" "}
              <span
                className={`text-blue-600 cursor-pointer inline-block ${
                  isHovered ? "animate-bounce" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                My Clinic!
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mt-6 leading-relaxed">
              Providing exceptional care to keep you healthy and happy. Your
              health is our priority, and we strive to offer the highest standard
              of medical care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/bookappointment"
                className="group bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Book Appointment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/chatbox"
                className="group bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Chat with Doctor
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Section with Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-10 transform rotate-3"></div>
              <img
                src="/images/hero.jpg"
                alt="A welcoming view of the clinic"
                className="w-full h-auto rounded-lg shadow-2xl object-cover transform transition duration-500 hover:scale-105 relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FaStethoscope className="text-4xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">General Consultation</h3>
                <p className="text-gray-600 text-center">
                  Comprehensive medical consultations to address your health concerns.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <FaPills className="text-4xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Specialized Treatments</h3>
                <p className="text-gray-600 text-center">
                  Expert treatments for chronic conditions, mental health, and more.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                  <FaHeartbeat className="text-4xl text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Health Checkups</h3>
                <p className="text-gray-600 text-center">
                  Regular health screenings to keep you in peak condition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 md:mt-24 bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Hear from our satisfied patients who trust us for their healthcare needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-600 italic mb-4">
                "The care I received at My Clinic was outstanding. The doctors were attentive and compassionate."
              </p>
              <p className="font-semibold text-gray-800">— Sarah J.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-600 italic mb-4">
                "Thanks to My Clinic, I've never felt healthier. Their team truly cares about their patients."
              </p>
              <p className="font-semibold text-gray-800">— John D.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-600 italic mb-4">
                "I appreciate the personalized care I get at My Clinic. They are my go-to for all health concerns."
              </p>
              <p className="font-semibold text-gray-800">— Emma K.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
