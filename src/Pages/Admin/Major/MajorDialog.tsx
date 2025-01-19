import React, { useState, useEffect } from 'react';

const MajorDialog = ({ major, onClose }) => {
  const [name, setName] = useState(major?.name || '');
  const partnerId = localStorage.getItem('partner_id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem('access_token');
    const url = major
      ? `http://localhost:8000/api/majors/${major.id}`
      : `http://localhost:8000/api/majors`;
    const method = major ? 'PATCH' : 'POST';

    const body = major
      ? { name }
      : { name, partner_id: partnerId };

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {major ? 'Edit Major' : 'Create Major'}
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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MajorDialog;
