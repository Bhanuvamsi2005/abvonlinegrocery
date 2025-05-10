// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     gender: '',
//     dob: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:9094/api/auth/signup', formData);
//       setMessage('Signup successful!');
//       console.log(response.data);
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError('An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto' }}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
//         <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required type="email" />
//         <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
//         <select name="gender" value={formData.gender} onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input name="dob" placeholder="Date of Birth" type="date" value={formData.dob} onChange={handleChange} required />
//         <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Signup;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Signup.css';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     gender: '',
//     dob: '',
//     password: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await axios.post('http://localhost:9094/api/auth/signup', formData);
//       // Handle successful signup
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="signup-component-background">
//       <div className="signup-component-container">
//         <div className="signup-header">
//           <h1>Create Account</h1>
//         </div>
        
//         <div className="signup-form-container">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Your name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="mobile">Mobile number</label>
//               <input
//                 type="tel"
//                 id="mobile"
//                 name="mobile"
//                 className="form-control"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="gender">Gender</label>
//               <select
//                 id="gender"
//                 name="gender"
//                 className="form-control"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="dob">Date of Birth</label>
//               <input
//                 type="date"
//                 id="dob"
//                 name="dob"
//                 className="form-control"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             <button type="submit" className="btn">Continue</button>

//             <p className="legal-text">
//               By continuing, you agree to our Conditions of Use and Privacy Notice.
//             </p>
//           </form>

//           <div className="divider">
//             <span>Already have an account?</span>
//           </div>

//           <div className="login-redirect">
//             <a href="/login">Sign in</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    dob: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8080/api/auth/signup', formData);
      setShowSuccessPopup(true);
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        dob: '',
        password: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="signup-component-background">
      <div className="signup-component-container">
        <div className="signup-header">
          <h1>Create Account</h1>
        </div>
        
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="form-control"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn">Continue</button>

            <p className="legal-text">
              By continuing, you agree to our Conditions of Use and Privacy Notice.
            </p>
          </form>

          <div className="divider">
            <span>Already have an account?</span>
          </div>

          <div className="login-redirect">
            <Link to="/login">Sign in</Link>    
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="success-popup-content">
              <h3>Signup Successful!Go to Signin</h3>
              <p>Your account has been created successfully.</p>
              <button onClick={closePopup} className="popup-close-btn">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
