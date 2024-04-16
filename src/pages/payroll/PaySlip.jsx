import React, { useState } from 'react';
import './payslip.scss';
import SideBar from '../../components/sidebar/SideBar';
import axios from 'axios';

const PaySlip = () => {
    // State variables for form
    const [employeeID, setEmployeeID] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [paymonth, setPayMonth] = useState("");
    const [payDate, setPayDate] = useState("");
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
            const response = await axios.get(`http://hrm-service-be-1998239514.ap-south-1.elb.amazonaws.com/employee/get-by-id?empId=${inputValue}`);
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

    {/* API call for fetching monthly payslip */ }
    const handleFetchMonthlyPayslip = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://hrm-service-be-1998239514.ap-south-1.elb.amazonaws.com/salary/payslip-pdf?employeeId=${employeeID}&payPeriod=${paymonth}`,
                {
                    responseType: 'blob'
                }
            )
            const data = response.data;
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        }
        catch (error) {
            console.log("Error in fetching monthly payslip: ", error);
        }

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
                                                value={paymonth}
                                                onChange={(e) => setPayMonth(e.target.value)}
                                            />
                                            <label className='placeholder'>Pay Month</label>
                                        </div>
                                        <div className="input-container">
                                            <input
                                                type='text'
                                                className='input'
                                                placeholder='01-Mar-2024'
                                                value={payDate}
                                                onChange={(e) => setPayDate(e.target.value)}
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
                                    onClick={handleFetchMonthlyPayslip}
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
