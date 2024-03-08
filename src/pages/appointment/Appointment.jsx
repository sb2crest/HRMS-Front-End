import React, { useState } from 'react';
import './appointment.scss';
import SideBar from '../../components/sidebar/SideBar';

const Appointment = () => {
    /* Form State */
    const [employee, setEmployee] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [designation, setDesignation] = useState('');
    const [updated_designation, setUdesignation] = useState('');
    const [basicSalary, setBasicSalary] = useState('');
    const [updated_basicSalary, setUBasicSalary] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    // State variables for validation errors
    const [employeeError, setEmployeeError] = useState('');
    const [currentDateError, setCurrentDateError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [designationError, setDesignationError] = useState('');
    const [updatedDesignationError, setUpdatedDesignationError] = useState('');
    const [basicSalaryError, setBasicSalaryError] = useState('');
    const [updatedBasicSalaryError, setUpdatedBasicSalaryError] = useState('');

    // Form validation function
    const validateForm = () => {
        let isValid = true;
        if (!employee) {
            setEmployeeError("Employee ID is required");
            isValid = false;
        } else {
            setEmployeeError("");
        }
        if (!currentDate) {
            setCurrentDateError("Issued Date is required");
            isValid = false;
        } else {
            setCurrentDateError("");
        }
        if (!email) {
            setEmailError("Email ID is required");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (!designation) {
            setDesignationError("Designation is required");
            isValid = false;
        } else {
            setDesignationError("");
        }
        if (!updated_designation) {
            setUpdatedDesignationError("Updated Designation is required");
            isValid = false;
        } else {
            setUpdatedDesignationError("");
        }
        if (!basicSalary) {
            setBasicSalaryError("Basic Salary is required");
            isValid = false;
        } else {
            setBasicSalaryError("");
        }
        if (!updated_basicSalary) {
            setUpdatedBasicSalaryError("Updated Salary is required");
            isValid = false;
        } else {
            setUpdatedBasicSalaryError("");
        }
        return isValid;
    };

    return (
        <div style={{ display: "flex" }}>
            {/* start : sidebar */}
            <div className="sidebar">
                <SideBar />
            </div>
            {/* end : sidebar */}
            <div className='appointment'>
                <div className='appointment-container flex'>
                    <div className="form">
                        {/* start : form */}
                        <form>
                            <div className="field-container" style={{ display: "flex" }}>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={employee}
                                        onChange={(e) => setEmployee(e.target.value)}
                                    />
                                    <label className='placeholder'>Employee ID</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label className='placeholder'>Employee Name</label>
                                </div>
                            </div>
                            <div className="field-container" style={{ display: "flex" }}>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={currentDate}
                                        onChange={(e) => setCurrentDate(e.target.value)}
                                        placeholder='01-Mar-2024'
                                    />
                                    <label className='placeholder'>Issued Date</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label className='placeholder'>Email ID</label>
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
                                        value={updated_designation}
                                        onChange={(e) => setUdesignation(e.target.value)}
                                    />
                                    <label className='placeholder'>Updated Designation</label>
                                </div>
                            </div>
                            <div className="field-container" style={{ display: "flex" }}>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={basicSalary}
                                        onChange={(e) => setBasicSalary(e.target.value)}
                                    />
                                    <label className='placeholder'>Basic Salary</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={updated_basicSalary}
                                        onChange={(e) => setUBasicSalary(e.target.value)}
                                    />
                                    <label className='placeholder'>Updated Salary</label>
                                </div>
                            </div>
                            {/* start : button */}
                            <div className="button">
                                <button
                                    className='back-button'
                                >
                                    Send Email
                                </button>
                                <button
                                    className='save-button'
                                >
                                    Preview PDF
                                </button>
                            </div>
                            {/* end : button */}
                        </form>
                        {/* end : form */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment