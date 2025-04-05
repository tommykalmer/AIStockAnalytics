import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      setMessage("Failed to fetch users");
    }
  };

  const updateUser = async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/admin/users/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
      setMessage("User updated successfully");
    } catch (error) {
      setMessage("Failed to update user");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Panel</h2>
      {message && <p>{message}</p>}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>License</th>
            <th style={cellStyle}>Free Override</th>
            <th style={cellStyle}>Registered</th>
            <th style={cellStyle}>Is Admin</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>
                <select
                  value={user.license}
                  onChange={(e) => updateUser(user.id, { license: e.target.value })}
                >
                  <option value="gratis">Free</option>
                  <option value="premium">Premium</option>
                  <option value="guld">Gold</option>
                </select>
              </td>
              <td style={cellStyle}>
                <input
                  type="checkbox"
                  checked={user.is_temp_free}
                  onChange={(e) => updateUser(user.id, { is_temp_free: e.target.checked })}
                />
              </td>
              <td style={cellStyle}>{new Date(user.registered_at).toLocaleDateString()}</td>
              <td style={cellStyle}>
                <input
                  type="checkbox"
                  checked={user.is_admin}
                  onChange={(e) => updateUser(user.id, { is_admin: e.target.checked })}
                />
              </td>
              <td style={cellStyle}>
                <button onClick={() => updateUser(user.id, { reset_password: true })}>
                  Reset Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

export default AdminPanel;
