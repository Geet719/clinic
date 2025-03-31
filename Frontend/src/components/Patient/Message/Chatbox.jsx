import React, { useState, useEffect, useRef } from "react";
import Footer from "../../Footer";
import Navbar from "../Navbar";
import { FaPaperPlane } from "react-icons/fa";

const PatientChat = () => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const token = localStorage.getItem("token");

  // Fetch patient information
  const storedPatient = JSON.parse(localStorage.getItem("patient"));
  const patientId = storedPatient?._id;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!patientId) {
      console.error("Patient ID is not available.");
      return;
    }

    const fetchChat = async () => {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/chats/patientchat/${patientId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChatId(data._id);
          setMessages(data.messages || []);
        } else {
          console.error("Failed to fetch chat data");
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, [token, patientId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/message/${chatId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Error fetching messages");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId, token]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMessageData = {
      chatId: chatId,
      content: newMessage,
      userId: patientId,
      userType: "Patient",
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com/message/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMessageData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      } else {
        console.error("Error sending message:", data.message);
        alert("Error sending message: " + data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="border border-gray-300 rounded-lg w-full max-w-4xl bg-white shadow-lg">
          <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
              Chat with Doctor
            </h2>
            <div className="max-h-[60vh] overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white mb-4">
              {messages?.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender.userType === "Doctor"
                        ? "justify-start"
                        : "justify-end"
                    } mb-4`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[85%] md:max-w-[75%] ${
                        msg.sender.userType === "Doctor"
                          ? "bg-blue-500 text-white"
                          : "bg-green-200 text-black"
                      }`}
                    >
                      <p className="text-sm md:text-base break-words">{msg.content}</p>
                      <span className="text-xs text-gray-300 mt-1 block">
                        {new Date(msg.createdAt).toLocaleString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No messages yet.</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                required
                className="flex-1 border border-gray-300 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className={`bg-blue-500 text-white rounded-lg p-2 md:p-3 hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send <FaPaperPlane className="text-sm" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientChat;
