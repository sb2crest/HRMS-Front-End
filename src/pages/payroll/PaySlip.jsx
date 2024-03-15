import React, { useState } from 'react';
import './payslip.scss';
import SideBar from '../../components/sidebar/SideBar';
import axios from 'axios';

const PaySlip = () => {
    // State variables for form
    const [employeeID, setEmployeeID] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [selectedOption, setSelectedOption] = useState("Select");
    const [payMonthVisible, setPayMonthVisible] = useState(true);

    function updateTextField(event) {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        if (selectedValue === "Monthly") {
            setPayMonthVisible(true);
        } else if (selectedValue === "Yearly") {
            setPayMonthVisible(false);
        }
    }

    /* API call for fetching name from ID */
    const handleGetNameByID = async (inputValue) => {
        console.log("emp ID:" + inputValue);
        try {
            const response = await axios.get(`http://localhost:8081/employee/get-by-id?empId=${inputValue}`);
            setEmployeeName(response.data.employeeName);
        } catch (error) {
            console.log("Error in fetching employee name:", error);
        }
    }

    /* Function for handling Employee ID OnChange */
    const handleEmployeeIDChange = (e) => {
        const employeeid = e.target.value;
        setEmployeeID(employeeid);
        handleGetNameByID(employeeid);
    }

    return (
        <div style={{ display: "flex" }}>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className='payslip'>
                <div className='payslip-form flex'>
                    <div className="form">
                        <form>
                            <div className="field-container" style={{ display: "flex" }}>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={employeeName}
                                        placeholder={employeeName}
                                        readOnly
                                    />
                                    <label className='placeholder'>Employee Name</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={employeeID}
                                        onChange={handleEmployeeIDChange}
                                    />
                                    <label className='placeholder'>Employee ID</label>
                                </div>
                            </div>
                            <div className="p-container">
                                <p className='p-text'>Please select either Monthly Payslip or Yearly Payslip</p>
                                <select id="myDropdown" className='select' value={selectedOption} onChange={updateTextField}>
                                    <option value="Select" className='option'>Make a Selection</option>
                                    <option value="Monthly" className='option'>Monthly PaySlip</option>
                                    <option value="Yearly" className='option'>Yearly PaySlip</option>
                                </select>
                            </div>
                            {payMonthVisible ? (
                                <div className="selected-value">
                                    <p className='p-text'>Please enter Pay Month for Preview</p>
                                    <div className="field-container" style={{ display: "flex" }}>
                                        <div className="input-container">
                                            <input
                                                type='text'
                                                className='input'
                                                placeholder='March 2024'
                                            />
                                            <label className='placeholder'>Pay Month</label>
                                        </div>
                                        <div className="input-container">
                                            <input
                                                type='text'
                                                className='input'
                                                placeholder='01-Mar-2024'
                                            />
                                            <label className='placeholder'>Pay Date</label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="selected-value">
                                    <p className='p-text'>Please enter Pay Year for Preview</p>
                                    <div className="field-container" style={{ display: "flex" }}>
                                        <div className="input-container">
                                            <input
                                                type='text'
                                                className='input'
                                                placeholder='2024'
                                            />
                                            <label className='placeholder'>Pay Year</label>
                                        </div>
                                        <div className="input-container">
                                            <input
                                                type='text'
                                                className='input'
                                            />
                                            <label className='placeholder'>Pay Month</label>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaySlip;
