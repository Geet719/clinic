import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaBars } from "react-icons/fa";
import DrNavbar from "../DrNavbar";
import Footer from "../../Footer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { ChatProvider } from "./ChatProvider";

function ChatPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  return (
    <ChatProvider>
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
    </ChatProvider>
  );
}

export default ChatPage;
