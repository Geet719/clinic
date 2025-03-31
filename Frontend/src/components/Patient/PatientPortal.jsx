import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "./Navbar";
import {
  FaCalendarAlt,
  FaUser,
  FaFileMedical,
  FaExclamationCircle,
} from "react-icons/fa";

function PatientPortal() {
  const [data, setData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedPatient = JSON.parse(localStorage.getItem("patient"));
  const patientID = storedPatient?._id;

  useEffect(() => {
    if (!patientID) return;

    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/patient/${patientID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }

        const fetchedData = await response.json();
        setData(fetchedData);

        const appointments = fetchedData.appointments || [];
        console.log("Fetched Appointment IDs:", appointments);

        if (appointments.length > 0) {
          const appointmentResponses = await Promise.all(
            appointments.map((appointment) =>
              fetch(
                `https://clinic-6-hxpa.onrender.com/appointments/${appointment._id}`
              )
            )
          );

          const appointmentData = await Promise.all(
            appointmentResponses.map((res) => {
              if (!res.ok) {
                throw new Error("Failed to fetch an appointment.");
              }
              return res.json();
            })
          );

          const sortedAppointments = appointmentData.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setAppointments(sortedAppointments);
        }
      } catch (error) {
        console.error("Error fetching patient or appointments:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientID]);

  const today = new Date();
  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate > today;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-4 md:py-8 px-2 md:px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-3 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6 text-center">
            Welcome to Your Patient Portal
          </h1>

          {loading && (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          )}
          {error && (
            <div className="text-center text-red-500 py-4">{error}</div>
          )}

          {data ? (
            <div className="space-y-4 md:space-y-6">
              {/* General Information */}
              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-3 md:mb-4 flex items-center">
                  <FaUser className="mr-2 md:mr-3" /> General Information
                </h3>
                <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
                  <p className="break-words">
                    <strong>Name:</strong> {data.fullName}
                  </p>
                  <p className="break-words">
                    <strong>Email:</strong> {data.email}
                  </p>
                  <p>
                    <strong>Registered Date:</strong>{" "}
                    {new Date(data.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Next Appointment */}
              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h4 className="text-xl md:text-2xl font-semibold text-green-500 flex items-center mb-3 md:mb-4">
                  <FaCalendarAlt className="mr-2 md:mr-3" /> Next Appointment
                </h4>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-2 text-sm md:text-base text-gray-700">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        upcomingAppointments[0].date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {upcomingAppointments[0].timeSlot || "N/A"}
                    </p>
                  </div>
                ) : (
                  <p className="text-red-500 text-sm md:text-base">No upcoming appointments.</p>
                )}
              </div>

              {/* Medical History */}
              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-3 md:mb-4 flex items-center">
                  <FaFileMedical className="mr-2 md:mr-3" /> Medical History
                </h3>
                {data?.medicalHistory?.length ? (
                  <div className="space-y-3 md:space-y-4">
                    {data.medicalHistory.map((history, index) => (
                      <div
                        key={index}
                        className="p-3 md:p-4 border border-gray-300 rounded-lg bg-gray-50"
                      >
                        <div className="space-y-2 text-sm md:text-base">
                          <p>
                            <strong>Date:</strong>{" "}
                            {new Date(history.date).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Diagnosis:</strong> {history.diagnosis}
                          </p>
                          <p className="whitespace-pre-wrap">
                            <strong>Medication:</strong> {history.medication}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500 text-sm md:text-base">No medical history available.</p>
                )}
              </div>

              {/* Prohibitions Information */}
              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-3 md:mb-4 flex items-center">
                  <FaExclamationCircle className="mr-2 md:mr-3" /> Prohibitions
                </h3>
                <div className="p-3 md:p-4 border border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-sm md:text-base text-gray-700 whitespace-pre-wrap">
                    <strong>Prohibitions:</strong>{" "}
                    {data.prohibitions || "None available."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500 py-4">
              No patient data available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PatientPortal;
