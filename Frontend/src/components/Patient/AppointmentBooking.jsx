import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import { FaCalendarAlt, FaClock, FaSpinner } from "react-icons/fa";

const AppointmentBooking = () => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (date) {
      setLoading(true);
      setError(null);
      fetchAvailableSlots(date);
    }
  }, [date]);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com/appointments/available?date=${date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }
      const data = await response.json();
      setAvailableSlots(data.slots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setError("Unable to load available slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !timeSlot) {
      setError("Please select a date and time slot.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const patientDetails = JSON.parse(localStorage.getItem("patient"));
    const token = localStorage.getItem("token");

    if (!patientDetails || !token) {
      setError("Patient not logged in. Please log in to book an appointment.");
      setLoading(false);
      return;
    }

    const { _id, fullName, email, medicalHistory, profilePhoto } = patientDetails;

    const appointmentData = {
      patientId: _id,
      fullName,
      email,
      medicalHistory,
      profilePhoto,
      date,
      timeSlot,
    };

    try {
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com/appointments/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentData),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setDate("");
        setTimeSlot("");
        setAvailableSlots([]);
      } else {
        setError(data.message || "Error booking appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-4 md:py-10 px-2 md:px-4">
        <div className="bg-white shadow-2xl rounded-lg p-4 md:p-8 max-w-lg w-full mx-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8">
            Book an Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Date Picker */}
            <div className="relative">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FaCalendarAlt className="inline-block mr-1" /> Select Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm text-sm md:text-base"
              />
            </div>

            {/* Time Slot Selector */}
            <div className="relative">
              <label
                htmlFor="timeSlot"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FaClock className="inline-block mr-1" /> Select Time Slot
              </label>
              <select
                id="timeSlot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm text-sm md:text-base"
                disabled={!date || loading}
              >
                <option value="">-- Select a Time Slot --</option>
                {loading ? (
                  <option disabled>
                    <FaSpinner className="animate-spin inline-block mr-2" />
                    Loading...
                  </option>
                ) : availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))
                ) : (
                  <option disabled>No slots available</option>
                )}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md">
                <p className="text-red-700 text-sm md:text-base">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md">
                <p className="text-green-700 text-sm md:text-base">
                  Appointment booked successfully!
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 md:py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none font-medium shadow-md transition-all duration-300 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Booking...
                </span>
              ) : (
                'Book Appointment'
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentBooking;
