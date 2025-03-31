import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

const TodaysAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [doneAppointments, setDoneAppointments] = useState({});
  const [filter, setFilter] = useState("all"); // all, pending, done

  useEffect(() => {
    fetch("https://clinic-6-hxpa.onrender.com/appointments/today")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    const storedDoneAppointments =
      JSON.parse(localStorage.getItem("doneAppointments")) || {};
    setDoneAppointments(storedDoneAppointments);
  }, []);

  const handleDoneClick = (appointmentId) => {
    const newDoneAppointments = {
      ...doneAppointments,
      [appointmentId]: true,
    };

    setDoneAppointments(newDoneAppointments);
    localStorage.setItem(
      "doneAppointments",
      JSON.stringify(newDoneAppointments)
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "pending") return !doneAppointments[appointment._id];
    if (filter === "done") return doneAppointments[appointment._id];
    return true;
  });

  if (loading) {
    return (
      <>
        <DrNavbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">Loading today's appointments...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DrNavbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-xl font-semibold text-red-500">{error}</p>
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Today's Appointments
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("done")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === "done"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <FaCalendarAlt className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                No appointments found for the selected filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        {appointment.patientId && appointment.patientId.profilePhoto ? (
                          <img
                            src={`https://clinic-6-hxpa.onrender.com/${appointment.patientId.profilePhoto}`}
                            alt={appointment.patientId.fullName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUser className="text-2xl text-gray-400" />
                          </div>
                        )}
                        {doneAppointments[appointment._id] && (
                          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.patientId
                            ? appointment.patientId.fullName
                            : "Unknown Patient"}
                        </h3>
                        <p className="text-sm text-gray-500">Patient ID: {appointment.patientId?._id || "N/A"}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2" />
                        <span>{appointment.timeSlot}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDoneClick(appointment._id)}
                        disabled={doneAppointments[appointment._id]}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                          doneAppointments[appointment._id]
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {doneAppointments[appointment._id] ? "Completed" : "Mark as Done"}
                      </button>
                      <Link
                        to={`/medical-records/${appointment.patientId?._id}`}
                        className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TodaysAppointments;
