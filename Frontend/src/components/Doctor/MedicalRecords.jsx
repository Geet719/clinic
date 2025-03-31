import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaFileMedicalAlt,
  FaTrash,
  FaSpinner,
  FaExclamationCircle,
  FaHistory,
  FaUserMd,
  FaSearch,
} from "react-icons/fa";
import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

function PatientMedicalHistory() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://clinic-6-hxpa.onrender.com/history`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();

        const enrichedPatients = await Promise.all(
          data.map(async (patient) => {
            const nextAppointment = await fetchNextAppointment(
              patient.appointments
            );
            return { ...patient, nextAppointment };
          })
        );

        setPatients(enrichedPatients);
      } catch (err) {
        setError("Failed to fetch patients. Please try again later.");
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const fetchNextAppointment = async (appointmentIds) => {
    if (!appointmentIds || appointmentIds.length === 0) return null;

    try {
      const appointmentDetails = await Promise.all(
        appointmentIds.map((id) =>
          fetch(`https://clinic-6-hxpa.onrender.com/appointments/${id}`).then(
            (res) => res.json()
          )
        )
      );

      const futureAppointments = appointmentDetails.filter(
        (appointment) => new Date(appointment.date) > new Date()
      );

      futureAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

      return futureAppointments[0] || null;
    } catch (err) {
      console.error("Error fetching appointments:", err);
      return null;
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm(`Are you sure you want to delete the patient with email: ${email}?`)) {
      return;
    }

    try {
      setDeleteLoading(email);
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com/history/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete patient");
      }

      setPatients(patients.filter((patient) => patient.email !== email));
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while deleting the patient.");
    } finally {
      setDeleteLoading("");
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DrNavbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Patient Medical History
            </h1>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
              <p className="text-xl font-semibold text-red-700">{error}</p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FaUser className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                {searchTerm ? "No patients found matching your search." : "No patients found."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.email}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <img
                          src={`https://clinic-6-hxpa.onrender.com/${patient.profilePhoto}`}
                          alt={patient.fullName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {patient.nextAppointment && (
                          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                            <FaCalendarAlt className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {patient.fullName}
                        </h2>
                        <p className="text-gray-500 text-sm">{patient.email}</p>
                        <p className="text-gray-400 text-sm">
                          Registered: {new Date(patient.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {patient.nextAppointment && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <h3 className="text-sm font-medium text-green-800 mb-1">
                            Next Appointment
                          </h3>
                          <p className="text-sm text-green-700">
                            {new Date(patient.nextAppointment.date).toLocaleDateString()} at{" "}
                            {patient.nextAppointment.timeSlot}
                          </p>
                        </div>
                      )}

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          Latest Medical History
                        </h3>
                        {patient.medicalHistory.length > 0 ? (
                          <div className="text-sm text-gray-600">
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(
                                patient.medicalHistory[patient.medicalHistory.length - 1].date
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Diagnosis:</strong>{" "}
                              {patient.medicalHistory[patient.medicalHistory.length - 1].diagnosis}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No medical history available</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <Link
                        to="/single-patient"
                        state={{ patient }}
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDelete(patient.email)}
                        disabled={deleteLoading === patient.email}
                        className="py-2 px-4 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {deleteLoading === patient.email ? (
                          <FaSpinner className="animate-spin mr-2" />
                        ) : (
                          <FaTrash className="mr-2" />
                        )}
                        Delete
                      </button>
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
}

export default PatientMedicalHistory;
