import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminlogin.css";

function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Create floating circles
    const container = document.querySelector('.admin-login-container');
    const circleCount = 8;
    
    for (let i = 0; i < circleCount; i++) {
      const circle = document.createElement('div');
      circle.className = 'floating-circle';
      
      // Random size between 100px and 300px
      const size = Math.random() * 200 + 100;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      
      // Random position
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      circle.style.animationDuration = `${Math.random() * 10 + 15}s`;
      circle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(circle);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      (adminId === "admin1" && password === "1234567890") || 
      (adminId === "admin2" && password === "0987654321")
    ) {
      navigate("/adminportal");
    } else {
      alert("Invalid Admin ID or Password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-form-container">
        <h2 className="login-title">Admin Portal</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              className="login-input"
              type="text"
              placeholder=" "
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />
            <label className="input-label">Admin ID</label>
          </div>
          <div className="input-group">
            <input
              className="login-input"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="input-label">Password</label>
          </div>
          <button className="login-button" type="submit">SIGN IN</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;