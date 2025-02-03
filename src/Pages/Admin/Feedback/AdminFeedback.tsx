import React, { useState, useEffect } from "react";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar.tsx";
import ContentHeader from "../ContentHeader.tsx";
import AdminFeedbackDetail from "./AdminFeedbackDetail.tsx";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch feedbacks by partner ID with Authorization header
  useEffect(() => {
    const partnerId = localStorage.getItem("partner_id"); // Replace with actual partner ID
    const accessToken = localStorage.getItem("access_token"); // Get the access token

    fetch(`${API_BASE_URL}/api/feedback/partner/${partnerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        return response.json();
      })
      .then((data) => {
        if (data.data) setFeedbacks(data.data);
      })
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarHomePage />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <ContentHeader />
          {/* <h2 className="text-2xl font-bold mb-4">Feedback</h2> */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Message</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr
                    key={feedback.id}
                    onClick={() => handleFeedbackClick(feedback)}
                    className="border-b cursor-pointer hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4">
                      {feedback.name || "Anonymous"}
                    </td>
                    <td className="py-2 px-4">
                      {feedback.message.substring(0, 50)}...
                    </td>
                    <td className="py-2 px-4">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isDialogOpen && selectedFeedback && (
            <AdminFeedbackDetail
              feedbackId={selectedFeedback.id}
              onClose={handleDialogClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
