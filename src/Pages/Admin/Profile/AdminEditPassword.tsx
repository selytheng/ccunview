import React, { useState } from "react";

interface AdminEditPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminEditPassword: React.FC<AdminEditPasswordProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/changepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Password updated successfully");
        onClose();
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Edit Password</h2>
        <div className="space-y-4">
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            placeholder="Current Password"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditPassword;
