import React, { useState, useEffect } from 'react';
import { FaUserMd, FaClock, FaChevronRight } from 'react-icons/fa';

const SideDrawer = ({ setSelectedDoctorChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const patient = JSON.parse(localStorage.getItem("patient"));

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/chats/patient/${patient._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }

        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (patient?._id) {
      fetchChats();
    }
  }, [patient?._id, token]);

  const formatLastMessage = (message) => {
    if (!message) return 'No messages yet';
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      return date.toLocaleDateString();
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error loading chats: {error}
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
      </div>
      
      <div className="space-y-2">
        {chats.map((chat) => (
          <button
            key={chat._id}
            onClick={() => setSelectedDoctorChat(chat)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUserMd className="text-blue-600 text-xl" />
                </div>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium text-gray-900">
                  Dr. {chat.doctor?.name || 'Doctor'}
                </span>
                <span className="text-sm text-gray-500">
                  {formatLastMessage(chat.lastMessage?.content)}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">
                {formatTime(chat.lastMessage?.createdAt)}
              </span>
              <FaChevronRight className="text-gray-400" />
            </div>
          </button>
        ))}
        
        {chats.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No conversations yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SideDrawer;
