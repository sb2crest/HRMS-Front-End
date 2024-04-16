import React, { useState } from 'react';
import './offerletter.scss';
import axios from 'axios';
import SideBar from '../../components/sidebar/SideBar';

const OfferLetter = () => {
    /* Form State */
    const [employee, setEmployee] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [doj, setDOJ] = useState('');
    const [basicSalary, setBasicSalary] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    // State variables for validation errors
    const [employeeError, setEmployeeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [dojError, setDOJError] = useState('');
    const [basicSalaryError, setBasicSalaryError] = useState('');
    const [designationError, setDesignationError] = useState('');
    const [departmentError, setDepartmentError] = useState('');
    const [currentDateError, setCurrentDateError] = useState('');

    // Form validation function
    // Form validation function
    const validateForm = () => {
        let isValid = true;
        if (!employee) {
            setEmployeeError("Employee Name is required");
            window.alert("Employee Name is required");
            isValid = false;
        } else {
            setEmployeeError("");
        }
        if (!email) {
            setEmailError("Email is required");
            window.alert("Email is required");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (!phoneNumber) {
            setPhoneNumberError("Phone Number is required");
            window.alert("Phone Number is required");
            isValid = false;
        } else {
            setPhoneNumberError("");
        }
        if (!doj) {
            setDOJError("Date of Joining is required");
            window.alert("Date of Joining is required");
            isValid = false;
        } else {
            setDOJError("");
        }
        if (!basicSalary) {
            setBasicSalaryError("CTC is required");
            window.alert("CTC is required");
            isValid = false;
        } else {
            setBasicSalaryError("");
        }
        if (!designation) {
            setDesignationError("Designation is required");
            window.alert("Designation is required");
            isValid = false;
        } else {
            setDesignationError("");
        }
        if (!department) {
            setDepartmentError("Department is required");
            window.alert("Department is required");
            isValid = false;
        } else {
            setDepartmentError("");
        }
        if (!currentDate) {
            setCurrentDateError("Issued Date is required");
            window.alert("Issued Date is required");
            isValid = false;
        } else {
            setCurrentDateError("");
        }
        return isValid;
    };
    
    /* API Integration for PDF Preview */
    const handlePreview = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post("http://hrm-service-be-1998239514.ap-south-1.elb.amazonaws.com/offer-letter/preview-letter", {
                fullName: employee,
                email: email,
                phoneNumber: phoneNumber,
                designation: designation,
                department: department,
                joiningDate: doj.toString(),
                ctc: basicSalary,
                issuedDate: currentDate
            }, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.log("Error in sending details:" + error);
        }
    }

    /* API Integration for PDF Preview */
    const handleSendPDF = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            console.log("Current Date:" + currentDate);
            const response = await axios.post("http://hrm-service-be-1998239514.ap-south-1.elb.amazonaws.com/offer-letter/send", {
                fullName: employee,
                email: email,
                phoneNumber: phoneNumber,
                designation: designation,
                department: department,
                joiningDate: doj,
                ctc: basicSalary,
                issuedDate: currentDate
            });
            const responseData = response.data;
            console.log(responseData);
        }
        catch (error) {
            console.log("Error in sending PDF:" + error);
        }
    }

    return (
        <>
            <div style={{ display: "flex" }}>
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className='offer-letter'>
                    <div className="offer-container flex">
                        <div className="form">
                            <form>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={employee}
                                            onChange={(e) => setEmployee(e.target.value)}
                                        />
                                        <label className='placeholder'>Employee</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                        <label className='placeholder'>Phone Number</label>
                                    </div>
                                </div>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label className='placeholder'>Email ID</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={currentDate}
                                            onChange={(e) => setCurrentDate(e.target.value)}
                                            placeholder='01-Feb-2024'
                                        />
                                        <label className='placeholder'>Issued Date</label>
                                    </div>
                                </div>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={doj}
                                            onChange={(e) => setDOJ(e.target.value)}
                                            placeholder='01-Feb-2024'
                                        />
                                        <label className='placeholder'>Date of Joining</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={basicSalary}
                                            onChange={(e) => setBasicSalary(e.target.value)}
                                        />
                                        <label className='placeholder'>CTC</label>
                                    </div>
                                </div>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={designation}
                                            onChange={(e) => setDesignation(e.target.value)}
                                        />
                                        <label className='placeholder'>Designation</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                        />
                                        <label className='placeholder'>Department</label>
                                    </div>
                                </div>
                                <div className="button">
                                    <button
                                        className='back-button'
                                        onClick={handleSendPDF}
                                    >
                                        Send Email
                                    </button>
                                    <button
                                        className='save-button'
                                        onClick={handlePreview}>
                                        Preview PDF
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OfferLetter