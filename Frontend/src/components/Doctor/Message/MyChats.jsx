import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaSpinner,
  FaExclamationCircle,
  FaSearch,
} from "react-icons/fa";

function MyChats({ selectedChat, setSelectedChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Get doctor data from localStorage
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    if (doctorData) {
      setDoctor(doctorData);
    }

    const fetchChats = async () => {
      try {
        setLoading(true);
        setError("");
        // Replace with your actual API endpoint
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/chat/doctor/${doctorData._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError("Failed to load chats. Please try again later.");
        console.error("Error fetching chats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorData) {
      fetchChats();
    }
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FaUser className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                {searchTerm ? "No patients found" : "No chats available"}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredChats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?._id === chat._id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={`https://clinic-6-hxpa.onrender.com/${chat.patientPhoto}`}
                      alt={chat.patientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {chat.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.patientName}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(chat.lastMessageTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyChats;
