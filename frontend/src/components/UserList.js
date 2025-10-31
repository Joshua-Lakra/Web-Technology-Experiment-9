import React, { useEffect, useState } from "react";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to fetch users"));
  }, []);

  return (
    <div className="userlist-container">
      <h2>All Registered Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.full_name}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
