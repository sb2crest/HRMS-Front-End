import React, { useState } from 'react';
import './login.scss';
import video from '../../images/video-login.gif';
import logo from '../../images/seabed-logo.jpeg';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import { GrUserAdmin } from "react-icons/gr";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaKey } from "react-icons/fa";
import axios from 'axios';

const Login = () => {

  /* set role */
  const [admin, setAdmin] = useState(true);
  const [employee, setEmployee] = useState(false);
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setredirect] = useState(false);

  const handleAdmin = () => {
    setAdmin(true);
    setEmployee(false);
  }

  const handleEmployee = () => {
    setEmployee(true);
    setAdmin(false);
  }

  /* Authentication API call */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/auth/login', {
        empId: empId,
        password: password
      });
      const token = response.data;
      localStorage.setItem('token', token);
      console.log("Token:" + token);
      setredirect(true);
    } catch (error) {
      setError('Invalid ID or password. Please try again.');
      console.log("error:" + error)
    }
  };

  return (
    /* main container */
    <div className="login flex" >
      {/* sub container */}
      <div className="container flex">
        {/* start: left container */}
        <div className="video">
          <img src={video} className='gif' />
        </div>
        {/* end: left container */}
        {/* start: right container */}
        <div className="form-div flex">
          {/* logo container */}
          <div className="header-div">
            <img src={logo} alt="logo" />
          </div>
          {/* start: form container */}
          <form action="" className='form grid'>
            {/* start: role selection container */}
            <div className="role flex">
              {/* admin */}
              <div className="admin tooltip" onClick={handleAdmin}>
                <span className="tooltiptext">Admin</span>
                <GrUserAdmin className='icon' />
              </div>
              {/* employee */}
              <div className="employee tooltip-employee" onClick={handleEmployee}>
                <span className="tooltiptext-employee">Employee</span>
                <IoPersonAddOutline className='icon' />
              </div>
            </div>
            {/* end: role selection container */}
            {/* start: admin input */}
            {admin &&
              <>
                <div className="input-div">
                  <div className="input flex">
                    <FaUserShield className='icon' />
                    <input
                      type="text"
                      id="username"
                      placeholder='Admin ID'
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div">
                  <div className="input flex">
                    <BsFillShieldLockFill className='icon' />
                    <input
                      type="password"
                      id="password"
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </>
            }
            {/* end: admin input  */}
            {/* start: employee input */}
            {employee &&
              <>
                <div className="input-div">
                  <div className="input flex">
                    <FaUserShield className='icon' />
                    <input type="text" id="username" placeholder='Employee ID' />
                  </div>
                </div>
                <div className="input-div">
                  <div className="input flex">
                    <BsFillShieldLockFill className='icon' />
                    <input type="password" id="password" placeholder='Password' />
                  </div>
                </div>
              </>
            }
            {/* end: employee input  */}
            {/*  start: login button  */}
            {redirect ? (
              <>
                <Link to="home">
                  <button className='btn'>
                    <span>Login</span>
                    <SlLogin className='icon' />
                  </button>
                </Link>
              </>
            )
              :
              (
                <button className='btn' onClick={handleSubmit}>
                  <span>Authenticate</span>
                  <FaKey className='icon' />
                </button>
              )
            }
            {/*  end: login button  */}
            {/*  start: forget password container */}
            <span className='forgot-password'>
              Forgot your Password?
              <a href='#'>
                Click Here
              </a>
            </span>
            {/*  end: forget password container */}
          </form>
          {/* end: form container */}
        </div>
        {/* end: right container */}
      </div>
    </div >
  )
}

export default Login