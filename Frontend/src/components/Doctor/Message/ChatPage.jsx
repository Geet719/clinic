import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUser,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import DrNavbar from "../DrNavbar";
import Footer from "../../Footer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

function ChatPage() {
  const [doctor, setDoctor] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    // Get doctor data from localStorage
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    if (doctorData) {
      setDoctor(doctorData);
    }

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <>
        <DrNavbar />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DrNavbar />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-xl font-semibold text-red-700">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DrNavbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <FaBell className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-16rem)]">
              {/* Sidebar */}
              <div
                className={`${
                  showSidebar ? "block" : "hidden"
                } md:block w-full md:w-80 border-r border-gray-200`}
              >
                <MyChats
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              </div>

              {/* Chat Area */}
              <div className="flex-1">
                {selectedChat ? (
                  <ChatBox
                    selectedChat={selectedChat}
                    doctor={doctor}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <FaUser className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-gray-700">
                        Select a patient to start chatting
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChatPage;
