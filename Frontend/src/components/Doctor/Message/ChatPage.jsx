import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaBars, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import DrNavbar from "../DrNavbar";
import Footer from "../../Footer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { ChatProvider, useChat } from "./ChatProvider";

function ChatContent() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { fetchChats, loading, error } = useChat();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-red-700">{error}</p>
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
