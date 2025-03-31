import React from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import { FaGraduationCap, FaBriefcase, FaLanguage, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4">
                Meet Dr. Geetanshu
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Dental Surgeon & Cardiologist
              </p>
            </div>

            {/* Content: Left Section - Doctor Image and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-full opacity-10 transform rotate-3"></div>
                  <img
                    src="/images/doctor.jpeg"
                    alt="Dr. Geetanshu"
                    className="w-48 h-48 object-cover rounded-full shadow-xl border-4 border-blue-600 relative z-10 transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mt-6">
                  Dr. Geetanshu
                </h2>
                <p className="text-gray-600 text-lg mt-2">Dental Surgeon</p>
                <p className="text-gray-600 text-lg">Cardiologist</p>
              </div>

              {/* Right Section - Profile Details */}
              <div className="space-y-8">
                {/* Profile */}
                <div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-6">Profile</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <FaBriefcase className="text-2xl text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Experience</h3>
                        <p className="text-gray-600">19+ Years of Experience</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <FaLanguage className="text-2xl text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Languages</h3>
                        <p className="text-gray-600">English, Hindi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200 hover:bg-blue-200 transition-colors duration-300">
                      Dentistry
                    </span>
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200 hover:bg-blue-200 transition-colors duration-300">
                      Surgery
                    </span>
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200 hover:bg-blue-200 transition-colors duration-300">
                      Implantology
                    </span>
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200 hover:bg-blue-200 transition-colors duration-300">
                      Paediatrics
                    </span>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Education & Qualifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <FaGraduationCap className="text-xl text-blue-500" />
                      <div>
                        <p className="text-gray-600">MBBS - AIIMS Delhi, 2005</p>
                        <p className="text-gray-600">MD (Cardiology) - AIIMS Delhi, 2010</p>
                        <p className="text-gray-600">Fellowship in Dental Surgery - 2015</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <FaPhone className="text-xl text-blue-500" />
                      <p className="text-gray-600">0123 456 789</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaEnvelope className="text-xl text-blue-500" />
                      <p className="text-gray-600">dr.jordan@example.com</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaMapMarkerAlt className="text-xl text-blue-500" />
                      <p className="text-gray-600">Gorakhpur U.P, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
