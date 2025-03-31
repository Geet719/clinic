import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaFileMedicalAlt,
  FaPills,
  FaBan,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import DrNavbar from "./DrNavbar";
import Footer from "../Footer";

function UpdateHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const id = patient?._id;

  const [formData, setFormData] = useState({
    date: patient?.medicalHistory?.length
      ? new Date(patient.medicalHistory[patient.medicalHistory.length - 1].date)
          .toISOString()
          .substr(0, 10)
      : "",
    diagnosis: patient?.medicalHistory?.length
      ? patient.medicalHistory[patient.medicalHistory.length - 1].diagnosis
      : "",
    medication: patient?.medicalHistory?.length
      ? patient.medicalHistory[patient.medicalHistory.length - 1].medication
      : "",
    prohibitions: patient?.prohibitions || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const updatedHistory = {
      date: formData.date,
      diagnosis: formData.diagnosis,
      medication: formData.medication,
      prohibitions: formData.prohibitions,
    };

    try {
      const response = await fetch(
        `https://clinic-6-hxpa.onrender.com/patient/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicalHistory: [updatedHistory],
            prohibitions: formData.prohibitions,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess("Medical history and prohibitions updated successfully!");
        setTimeout(() => {
          navigate("/medical-records");
        }, 2000);
      } else {
        setError(result.error || "Failed to update medical history and prohibitions");
      }
    } catch (error) {
      setError("An error occurred while updating the medical history and prohibitions.");
    } finally {
      setLoading(false);
    }
  };

  if (!patient) {
    return (
      <>
        <DrNavbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">No patient data available</p>
            <button
              onClick={() => navigate("/medical-records")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Return to Medical Records
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DrNavbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Edit Medical History & Prohibitions
                </h2>
                <div className="flex items-center justify-center text-gray-600">
                  <FaUser className="mr-2" />
                  <span className="font-medium">{patient.fullName}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-700">
                    <FaExclamationCircle className="mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <FaCheckCircle className="mr-2" />
                    <span>{success}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      Date
                    </div>
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FaFileMedicalAlt className="mr-2" />
                      Diagnosis
                    </div>
                  </label>
                  <input
                    name="diagnosis"
                    type="text"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="Enter diagnosis"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FaPills className="mr-2" />
                      Medication
                    </div>
                  </label>
                  <textarea
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <FaBan className="mr-2" />
                      Prohibitions
                    </div>
                  </label>
                  <textarea
                    name="prohibitions"
                    value={formData.prohibitions}
                    onChange={handleChange}
                    placeholder="Enter prohibitions details"
                    required
                    rows="3"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate("/medical-records")}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Medical History"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateHistory;
