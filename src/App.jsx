import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/Homepage';
// import Shopping from './components/Shopping';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Signup from './components/Signup';
// import Signin from './components/Signin';
import Prehome from './components/Prehome';
import About from './components/About';
import Registration from './components/Registration';
import ContactUs from './components/Contactus';
import Payment from './components/Payment';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Payment1 from './components/Payment1';
import AdminPortal from './components/AdminPortal';
import AdminLogin from './components/AdminLogin';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Prehome />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<Homepage />} />
          <Route path='/About' element={<About />} />
          <Route path="/prehome" element={<Prehome />} /> 
          
          <Route path="/adminportal" element={<AdminPortal />} />
          <Route path="/payment" element={<Payment1 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/adminlogin" element={<AdminLogin />} />
          {/* <Route path="/Shopping" element={<Shopping />} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/Signin' element={<Signin/>}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;