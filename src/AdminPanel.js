// AdminPanel.js

import React, { useState } from 'react';

function AdminPanel({ onAdminLogin }) {
    const [password, setPassword] = useState('12345678');

  const handleLogin = () => {
    // Here you can implement your authentication logic
    // For simplicity, let's assume the correct password is 'admin'
    if (password === 'admin') {
      onAdminLogin();
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminPanel;
