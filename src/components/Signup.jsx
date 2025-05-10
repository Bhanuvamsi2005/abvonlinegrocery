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
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8084/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          setSuccessMessage('Registration successful!');
          // Clear form or redirect
          setFormData({
            name: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: ''
          });
        } else {
          setErrors({ server: data.message || 'Registration failed' });
        }
      } catch (error) {
        setErrors({ server: 'Network error. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errors.server && <div className="error-message">{errors.server}</div>}
      
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile"
            maxLength="10"
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Signup;
