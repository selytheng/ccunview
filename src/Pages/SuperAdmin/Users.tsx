import React, { useEffect, useState } from "react";
import NavbarHomePage from "../../components/Navbar_HomePage";
import Sidebar from "../../components/Sidebar";
import ContentHeader from "../Admin/ContentHeader";
import UserRegistration from "./UserRegistration";
import UserEdit from "./UserEdit";
import API_BASE_URL from "../../components/API_BASE_URL";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/allUser`, {
          method: "POST",
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchPartners = async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${API_BASE_URL}/api/partners`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch partners");
        }
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchUsers();
    fetchPartners();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    const access_token = localStorage.getItem("access_token");
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        alert("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const toggleAddModal = () => setShowAddModal(!showAddModal);
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarHomePage />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <ContentHeader title="User Management" />
          <button
            onClick={toggleAddModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
          >
            Add User
          </button>
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="table-auto w-full text-sm text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role ID</th>
                  <th className="px-4 py-2">Partner ID</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role_id}</td>
                    <td className="px-4 py-2">{user.partner_id}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add User Modal */}
          {showAddModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded shadow-lg p-6 w-96">
                <button
                  className="text-gray-500 hover:text-gray-700 float-right"
                  onClick={toggleAddModal}
                >
                  X
                </button>
                <UserRegistration closeModal={toggleAddModal} />
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditModal && selectedUser && (
            <UserEdit
              user={selectedUser}
              partners={partners}
              closeModal={closeEditModal}
              updateUser={(updatedUser) =>
                setUsers((prevUsers) =>
                  prevUsers.map((u) =>
                    u.id === updatedUser.id ? updatedUser : u
                  )
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
