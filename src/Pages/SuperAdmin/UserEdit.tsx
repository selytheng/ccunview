import React, { useState } from "react";

const UserEdit = ({ user, partners, closeModal, updateUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    partner_id: user.partner_id,
    password: "", // Optional
    password_confirmation: "", // Optional
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    try {
      const bodyData = {
        name: formData.name,
        email: formData.email,
        partner_id: formData.partner_id,
      };

      // Include password and password_confirmation if filled
      if (formData.password && formData.password_confirmation) {
        bodyData.password = formData.password;
        bodyData.password_confirmation = formData.password_confirmation;
      }

      const response = await fetch(
        `http://localhost:8000/api/auth/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit user");
      }

      const updatedUser = await response.json();
      updateUser(updatedUser); // Update parent component's state
      closeModal(); // Close the modal after success
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <button
          className="text-gray-500 hover:text-gray-700 float-right"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Partner</label>
            <select
              value={formData.partner_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  partner_id: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Partner</option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password Confirmation
            </label>
            <input
              type="password"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
