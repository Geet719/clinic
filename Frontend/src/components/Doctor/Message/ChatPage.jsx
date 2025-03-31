import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaBars, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import DrNavbar from "../DrNavbar";
import Footer from "../../Footer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { ChatProvider, useChat } from "./ChatProvider";
import { useNavigate } from "react-router-dom";

function ChatContent() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { fetchChats, loading, error, isInitialized, doctor } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    // Get doctor data from localStorage
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    console.log("Doctor data from localStorage:", doctorData); // Debug log

    if (!doctorData) {
      console.log("No doctor data found, redirecting to login"); // Debug log
      navigate("/doctor/login");
      return;
    }

    if (isInitialized) {
      console.log("Fetching chats for doctor:", doctorData._id); // Debug log
      fetchChats();
    }
  }, [isInitialized, doctor, fetchChats, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DrNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Sidebar */}
          <div
            className={`${
              showSidebar ? "block" : "hidden"
            } md:block w-full md:w-1/3 lg:w-1/4 border-r border-gray-200`}
          >
            <MyChats />
          </div>

          {/* Chat Area */}
          <div className="flex-1">
            <ChatBox />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ChatPage() {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
}

export default ChatPage;
