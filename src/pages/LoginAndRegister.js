import React, { useState, useEffect } from 'react';
import './LoginRegister.css'; // Import your CSS file for styling
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../config/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toastify.css'; // Import your custom CSS for Toastify

const LoginRegister = () => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activePanel === 'login') {
      document.querySelector('.login-info-box').style.display = 'none';
      document.querySelector('.register-info-box').style.display = 'block';
      document.querySelector('.white-panel').classList.remove('right-log');
      document.querySelector('.login-show').classList.add('show-log-panel');
      document.querySelector('.register-show').classList.remove('show-log-panel');
    } else {
      document.querySelector('.login-info-box').style.display = 'block';
      document.querySelector('.register-info-box').style.display = 'none';
      document.querySelector('.white-panel').classList.add('right-log');
      document.querySelector('.login-show').classList.remove('show-log-panel');
      document.querySelector('.register-show').classList.add('show-log-panel');
    }
  }, [activePanel]);

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  const handleLogin = async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(loginEmail, loginPassword);
      console.log('User logged in:', response.user);
      navigate('/homepage');
    } catch (error) {
      setError(error.message);
      toast.error('Invalid credentials');
    }
  };

  const handleRegister = async () => {
    if (registerPassword !== registerConfirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(registerEmail, registerPassword);
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous"
      };
  
      // Add user data to Firestore under 'users' collection
      await setDoc(doc(firestore, 'users', user.uid), userData);
      console.log('User added to Firestore');
  
      // Redirect or perform any necessary actions
      navigate('/homepage');
    } catch (error) {
      setError(error.message);
      toast.error('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="login-reg-panel" style={{marginTop:'50vh'}}>
      <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
        className="toast-container"
        toastClassName="toast-message"
      />
      <div className="login-info-box">
        <h2>Have an account?</h2>
        <p>Lorem ipsum dolor sit amet</p>
        <label htmlFor="log-reg-show" onClick={() => handlePanelChange('login')}>Login</label>
      </div>
      
      <div className="register-info-box">
        <h2>Don't have an account?</h2>
        <p>Lorem ipsum dolor sit amet</p>
        <label htmlFor="log-login-show" onClick={() => handlePanelChange('register')}>Register</label>
      </div>
      
      <div className="white-panel">
        <div className={`login-show ${activePanel === 'login' ? 'show-log-panel' : ''}`}>
          <h2>LOGIN</h2>
          <input 
            type="text" 
            placeholder="Email" 
            value={loginEmail} 
            onChange={(e) => setLoginEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={loginPassword} 
            onChange={(e) => setLoginPassword(e.target.value)} 
          />
          <input 
            type="button" 
            value="Login" 
            onClick={handleLogin} 
          />
          <a href="#">Forgot password?</a>
        </div>
        <div className={`register-show ${activePanel === 'register' ? 'show-log-panel' : ''}`}>
          <h2>REGISTER</h2>
          <input 
            type="text" 
            placeholder="Email" 
            value={registerEmail} 
            onChange={(e) => setRegisterEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={registerPassword} 
            onChange={(e) => setRegisterPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={registerConfirmPassword} 
            onChange={(e) => setRegisterConfirmPassword(e.target.value)} 
          />
          <input 
            type="button" 
            value="Register" 
            onClick={handleRegister} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
