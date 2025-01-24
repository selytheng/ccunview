import React, { useEffect, useState } from 'react';

interface FeedbackDetailProps {
  feedbackId: number;
  onClose: () => void;
}

const AdminFeedbackDetail: React.FC<FeedbackDetailProps> = ({ feedbackId, onClose }) => {
  const [feedback, setFeedback] = useState<any>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    fetch(`http://localhost:8000/api/feedback/${feedbackId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch feedback detail');
        }
        return response.json();
      })
      .then((data) => {
        if (data.data) setFeedback(data.data);
      })
      .catch((error) => console.error('Error fetching feedback detail:', error));
  }, [feedbackId]);

  if (!feedback) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Feedback Details</h3>
          <div className="space-y-3">
            <DetailRow label="Name" value={feedback.name || 'Anonymous'} />
            <DetailRow label="Company" value={feedback.company || 'N/A'} />
            <DetailRow label="Email" value={feedback.email || 'N/A'} />
            <DetailRow label="Phone Number" value={feedback.phone_number || 'N/A'} />
            <div className="bg-gray-100 p-3 rounded-md">
              <strong className="block mb-2 text-gray-700">Message:</strong>
              <p className="text-gray-600">{feedback.message}</p>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              <strong>Date:</strong> {new Date(feedback.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component to create consistent detail rows
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between">
    <strong className="text-gray-700">{label}:</strong>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default AdminFeedbackDetail;