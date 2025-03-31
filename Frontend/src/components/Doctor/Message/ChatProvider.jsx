import React, { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get doctor data from localStorage
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    const token = localStorage.getItem("token");
    
    if (doctorData && token) {
      setDoctor(doctorData);
      setIsInitialized(true);
    } else {
      setError("Please login to access chat");
    }
  }, []);

  // Fetch all chats for the doctor
  const fetchChats = async () => {
    if (!doctor?._id) {
      setError("Doctor information not found. Please login again.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      // Debug: Log the request details
      console.log("Fetching chats with token:", token.substring(0, 10) + "...");
      console.log("Doctor ID:", doctor._id);
      
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com/chat/doctor/${doctor._id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        }
      );
      
      // Debug: Log the response details
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/doctor/login";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Debug: Log the response text for non-JSON responses
        const text = await response.text();
        console.log("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }
      
      const data = await response.json();
      console.log("Received chat data:", data);
      setChats(data);
    } catch (err) {
      console.error("Error fetching chats:", err);
      if (err.message.includes("non-JSON response")) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to load chats. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a specific chat
  const fetchMessages = async (chatId) => {
    if (!chatId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com/message/${chatId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/doctor/login";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      if (err.message.includes("non-JSON response")) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to load messages. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async (content) => {
    if (!content.trim() || !selectedChat || !doctor?._id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    const newMessage = {
      chatId: selectedChat._id,
      content,
      senderId: doctor._id,
      senderType: "Doctor",
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com/message/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/doctor/login";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data]);
      return data;
    } catch (err) {
      console.error("Error sending message:", err);
      if (err.message.includes("non-JSON response")) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to send message. Please try again.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a new chat
  const createChat = async (patientId) => {
    if (!doctor?._id) {
      setError("Doctor information not found. Please login again.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com/chat/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            doctorId: doctor._id,
            patientId,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/doctor/login";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChats((prevChats) => [...prevChats, data]);
      return data;
    } catch (err) {
      console.error("Error creating chat:", err);
      if (err.message.includes("non-JSON response")) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to create chat. Please try again.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async (chatId) => {
    if (!chatId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    try {
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com/message/read/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/doctor/login";
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update chat in the list
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === chatId
            ? { ...chat, unreadCount: 0 }
            : chat
        )
      );
    } catch (err) {
      console.error("Error marking messages as read:", err);
    }
  };

  const value = {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    messages,
    setMessages,
    loading,
    setLoading,
    error,
    setError,
    doctor,
    isInitialized,
    fetchChats,
    fetchMessages,
    sendMessage,
    createChat,
    markMessagesAsRead,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
