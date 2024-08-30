// SignUpForm.js
import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessLevel, setAccessLevel] = useState(''); 
  const [voucherCode, setVoucherCode] = useState(''); 

// Define handleSubmit function below the LoginForm component
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/auth/signup', { username, email, password,accessLevel,voucherCode });
    console.log(response.data); // Log response from the server
    // Optionally handle success response (e.g., show success message)
  } catch (error) {
    console.error('Sign-up failed:', error.response ? error.response.data : error);
    // Optionally handle error response (e.g., display error message to the user)
  }
};


return (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        className="form-control"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="accessLevel">Access Level:</label>
      <select
        className="form-control"
        id="accessLevel"
        value={accessLevel}
        onChange={(e) => setAccessLevel(e.target.value)}
        required
      >
        <option value="">Select access level</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="voucherCode">Voucher Code:</label>
      <input
        type="text"
        className="form-control"
        id="voucherCode"
        value={voucherCode}
        onChange={(e) => setVoucherCode(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary">Sign Up</button>
  </form>
);
}


export default SignUpForm;
