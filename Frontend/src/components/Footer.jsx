import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import 'animate.css';

function Footer() {
  return (
    <>
      <div className="bg-black h-auto">
        {/* Top Section */}
        <div className="py-6 flex flex-col md:flex-row justify-between p-4 md:p-12 gap-4 items-center">
          {/* Clinic name with animation for 2 seconds */}
          <div
            className="text-white text-2xl md:text-3xl font-bold mb-4 animate__animated animate__tada"
            style={{ animationDuration: '2s', animationIterationCount: '1' }}
          >
            <a href="#" className="hover:text-gray-300 transition-colors">My Clinic</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 md:gap-12">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <FaInstagram size={32} className="md:w-10 md:h-10" style={{ color: 'white' }} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <FaFacebook size={32} className="md:w-10 md:h-10" style={{ color: 'white' }} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <FaLinkedin size={32} className="md:w-10 md:h-10" style={{ color: 'white' }} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border border-gray-300 my-4 mx-4 md:mx-6" />

        {/* Contact and Donations Section */}
        <div className="flex flex-col md:flex-row justify-evenly px-4 md:px-6 space-y-6 md:space-y-0">
          {/* Contact Us */}
          <div className="font-semibold text-gray-400">
            <h2 className="text-lg md:text-xl text-gray-300 mb-2">Contact Us</h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li className="hover:text-gray-300 transition-colors">Clinic Appointments: +91 7668220147</li>
              <li className="hover:text-gray-300 transition-colors">Administrative Office: +91 7060881050</li>
              <li className="hover:text-gray-300 transition-colors">247340 Nakur, Saharanpur, UP, India</li>
            </ul>
          </div>

          {/* Donations */}
          <div className="font-semibold text-gray-400">
            <h2 className="text-lg md:text-xl text-gray-300 mb-2">Donations</h2>
            <div className="text-sm md:text-base hover:text-gray-300 transition-colors" style={{ whiteSpace: 'pre-line' }}>
              {`Thank you for supporting our
               work to provide the highest
               level of care.`}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border border-gray-300 my-4 mx-4 md:mx-6" />

        {/* Copyright */}
        <div className="text-xs md:text-sm text-white text-center pb-4">
          &copy; {new Date().getFullYear()} My Clinic. All rights reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;
