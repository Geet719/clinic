import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaFileMedicalAlt,
  FaBan,
  FaSpinner,
  FaExclamationCircle,
  FaHistory,
  FaUserMd,
} from "react-icons/fa";
import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

function PatientDetails() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const patient = location.state?.patient;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (patient?.appointments?.length > 0) {
        try {
          setLoading(true);
          const appointmentResponses = await Promise.all(
            patient.appointments.map((appointmentId) =>
              fetch(
                `https://clinic-6-hxpa.onrender.com/appointments/${appointmentId}`
              )
            )
          );

          const appointmentData = await Promise.all(
            appointmentResponses.map((res) => res.json())
          );

          const sortedAppointments = appointmentData.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setAppointments(sortedAppointments);
        } catch (error) {
          setError("Failed to fetch appointments");
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patient]);

  const nextAppointment = appointments[appointments.length - 1];

  if (!patient) {
    return (
      <>
        <DrNavbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">No patient data available</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DrNavbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Patient Details
                </h2>
                <div className="flex items-center justify-center text-gray-600">
                  <FaUser className="mr-2" />
                  <span className="font-medium">{patient.fullName}</span>
                </div>
              </div>

              {/* General Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUserMd className="mr-2 text-blue-500" />
                  General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-700">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>{patient.fullName}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    <span>Registered: {new Date(patient.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Next Appointment */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaClock className="mr-2 text-green-500" />
                  Next Appointment
                </h3>
                {nextAppointment ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-700">
                        <FaCalendarAlt className="mr-2 text-green-500" />
                        <span>
                          {new Date(nextAppointment.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaClock className="mr-2 text-green-500" />
                        <span>{nextAppointment.timeSlot || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600">No upcoming appointments.</p>
                  </div>
                )}
              </div>

              {/* Medical History */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaHistory className="mr-2 text-blue-500" />
                  Medical History
                </h3>
                {patient?.medicalHistory?.length ? (
                  <div className="space-y-4">
                    {patient.medicalHistory.map((history, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center text-gray-700 mb-2">
                          <FaCalendarAlt className="mr-2 text-blue-500" />
                          <span>{new Date(history.date).toLocaleDateString()}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <FaFileMedicalAlt className="mr-2 text-blue-500 mt-1" />
                            <div>
                              <p className="font-medium text-gray-700">Diagnosis:</p>
                              <p className="text-gray-600">{history.diagnosis}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <FaPills className="mr-2 text-blue-500 mt-1" />
                            <div>
                              <p className="font-medium text-gray-700">Medication:</p>
                              <p className="text-gray-600 whitespace-pre-wrap">{history.medication}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600">No medical history available.</p>
                  </div>
                )}
              </div>

              {/* Prohibitions */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaBan className="mr-2 text-red-500" />
                  Prohibitions
                </h3>
                {patient?.prohibitions ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <FaBan className="mr-2 text-red-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-700">Prohibitions:</p>
                        <p className="text-gray-600 whitespace-pre-wrap">{patient.prohibitions}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600">No prohibitions available.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Link
                  to="/update-history"
                  state={{ patient }}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  Update Medical History
                </Link>
                <Link
                  to="/medical-records"
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-center"
                >
                  Back to Records
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PatientDetails;
