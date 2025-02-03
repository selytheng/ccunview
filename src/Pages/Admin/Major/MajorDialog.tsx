import React, { useState, useEffect } from "react";
import { Major } from "../../../types/interface";
import API_BASE_URL from "../../../components/API_BASE_URL";

interface MajorDialogProps {
  major: Major | null;
  onClose: () => void;
  onCreateSuccess: (action: "create" | "update") => void;
}

const MajorDialog: React.FC<MajorDialogProps> = ({
  major,
  onClose,
  onCreateSuccess,
}) => {
  const [name, setName] = useState(major?.name || "");
  const [description, setDescription] = useState(major?.description || ""); // New state for description
  const [logo, setLogo] = useState<File | null>(null); // New state for logo
  const [loading, setLoading] = useState(false);

  const partnerId = localStorage.getItem("partner_id");

  useEffect(() => {
    if (major) {
      setName(major.name);
      setDescription(major.description);
    }
  }, [major]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const access_token = localStorage.getItem("access_token");
    const url = major
      ? `${API_BASE_URL}/api/majors/${major.id}`
      : `${API_BASE_URL}/api/majors`; // Ensure correct URL for create/update

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("partner_id", partnerId || ""); // Include partner_id if it's a new major

    if (logo) {
      formData.append("logo", logo); // Append the logo file if it exists
    }

    if (major) {
      formData.append("_method", "PUT"); // Use PUT for updating
    }

    const response = await fetch(url, {
      method: "POST", // Always POST, use _method for PUT
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });

    if (response.ok) {
      onCreateSuccess(major ? "update" : "create");
      onClose(); // Close dialog and trigger refetch of majors
    } else {
      alert("Failed to create or update major");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {major ? "Edit Major" : "Create Major"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MajorDialog;
