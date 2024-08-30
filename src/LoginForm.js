import React, { useState } from 'react';
import axios from 'axios';
import SignUpForm from './SignUpForm'; // Import SignUpForm component
import { TextField, Button, Card, CardHeader, CardContent } from '@material-ui/core'; // Import Material-UI components
import './LoginForm.css'; // Import CSS file for custom styling

function LoginForm({ setUserRole, setIsLoggedIn, setIsLoginError, setLoggedInFlag, loggedInFlag, isLoggedIn }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignUpModal, setShowSignUpModal] = useState(false); // State to control the display of SignUpForm modal

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { usernameOrEmail, password });
      console.log(response); // Log the response object

      const token = response.data.token;
      localStorage.setItem('token', token);
      const user = response.data.user;
      if (user && user.role) {
        setUserRole(user.role);
      }
      setIsLoggedIn(true);
      setIsLoginError(false);
      // Trigger re-render by updating a dummy state variable
      setLoggedInFlag(!loggedInFlag);
      console.log('User logged in:', isLoggedIn); // Add this line to check the value of isLoggedIn

      // Reset background color to default
      // document.body.style.backgroundColor = '';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoginError(true);
      } else {
        console.error('Login failed:', error.response ? error.response.data : error);
        alert('An error occurred while logging in. Please try again later.');
      }
    }
  };

  // Function to toggle the display of SignUpForm modal
  const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
  };

  return (
    <div className="login-form-container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <Card>
            <CardHeader className="bg-primary text-white" title="Login" />
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <TextField
                    label="Username or Email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="d-flex justify-content-between">
                  <Button type="submit" variant="contained" color="primary">Login</Button>
                  <Button type="button" variant="contained" color="secondary" onClick={toggleSignUpModal}>Sign Up</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* SignUpForm modal */}
      <div className={`modal fade${showSignUpModal ? ' show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSignUpModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Sign Up</h5>
              <button type="button" className="close" onClick={toggleSignUpModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
