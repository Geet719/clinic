import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaSpinner,
  FaExclamationCircle,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { useChat } from "./ChatProvider";

function ChatBox() {
  const { 
    selectedChat, 
    messages, 
    sendMessage, 
    loading, 
    error 
  } = useChat();
  const [message, setMessage] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/patient/${selectedChat.patientId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient details");
        }
        const data = await response.json();
        setPatientDetails(data);
      } catch (err) {
        console.error("Error fetching patient details:", err);
      }
    };

    if (selectedChat) {
      fetchPatientDetails();
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      chatId: selectedChat._id,
      content: message,
      senderId: selectedChat.doctorId,
      senderType: "Doctor",
    };

    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com/message/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      sendMessage(data);
      setMessage("");
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={`https://clinic-6-hxpa.onrender.com/${patientDetails?.profilePhoto}`}
              alt={patientDetails?.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {patientDetails?.fullName || "Loading..."}
            </h2>
            <p className="text-sm text-gray-500">
              {patientDetails?.email || "Loading..."}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
              <p className="text-xl font-semibold text-red-700">{error}</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FaUser className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                No messages yet. Start the conversation!
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderType === "Doctor" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.senderType === "Doctor"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <FaClock className="text-xs" />
                  <span className="text-xs opacity-75">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <FaPaperPlane />
                <span>Send</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
