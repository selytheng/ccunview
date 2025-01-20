import React, { useEffect, useState } from "react";

const UserRegistration = ({ closeModal }) => {
  const [partners, setPartners] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    partner_id: "",
    password: "",
    c_password: "",
  });

  useEffect(() => {
    const fetchPartners = async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        const response = await fetch("http://localhost:8000/api/partners", {
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

    fetchPartners();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      alert("User registered successfully");
      closeModal();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">User Registration</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Partner</label>
        <select
          name="partner_id"
          value={form.partner_id}
          onChange={handleChange}
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
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          name="c_password"
          value={form.c_password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default UserRegistration;
