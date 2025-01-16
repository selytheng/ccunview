import React from 'react';

const MajorTable = ({ majors, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    const access_token = localStorage.getItem('access_token');
    await fetch(`http://localhost:8000/api/majors/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${access_token}` },
    });
    onDelete();
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {majors.map((major) => (
          <tr key={major.id}>
            <td className="border border-gray-300 px-4 py-2">{major.id}</td>
            <td className="border border-gray-300 px-4 py-2">{major.name}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onEdit(major)}
                className="mr-2 px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(major.id)}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MajorTable;
