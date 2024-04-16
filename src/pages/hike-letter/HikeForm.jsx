/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './hikeform.scss';
import axios from 'axios';
import SideBar from '../../components/sidebar/SideBar';

const HikeForm = () => {
    // State variables for form
    const [employee, setEmployee] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [percentage, setPercentage] = useState("");
    const [approvedBy, setApprovedBy] = useState("");
    const [effectiveDay, setEffectiveDay] = useState("");
    const [reason, setReason] = useState("");
    const [promotionStatus, setPromotionStatus] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [emailsent, setEmailSent] = useState(false);
    const [presentDesignation, setPresentDesignation] = useState("");
    const [newPosition, setNewPosition] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const [approvedDate, setApprovedDate] = useState("");

    // State variables for validation errors
    const [nameError, setNameError] = useState("");
    const [percentageError, setPercentageError] = useState("");
    const [approvedByError, setApprovedByError] = useState("");
    const [effectiveDayError, setEffectiveDayError] = useState("");
    const [reasonError, setReasonError] = useState("");

    const handlePromotionStatus = () => {
        setPromotionStatus(true);
    }

    // eslint-disable-next-line no-lone-blocks
    {/* Dropdown Function */ }
    function updateTextField() {
        var dropdown = document.getElementById("myDropdown");
        var selectedValue = dropdown.options[dropdown.selectedIndex].text;
        setNewPosition(selectedValue);
    }

    // Form validation function
    const validateForm = () => {
        let isValid = true;
        if (!employeeName) {
            setNameError("Employee Name is required");
            window.alert("Employee Name is required");
            isValid = false;
        } else {
            setNameError("");
        }
        if (!percentage) {
            setPercentageError("Hike Percentage is required");
            window.alert("Hike Percentage is required");
            isValid = false;
        } else {
            setPercentageError("");
        }
        if (!approvedBy) {
            setApprovedByError("Approved By is required");
            window.alert("Approved By is required");
            isValid = false;
        } else {
            setApprovedByError("");
        }
        if (!effectiveDay) {
            setEffectiveDayError("Effective Date is required");
            window.alert("Effective Date is required");
            isValid = false;
        } else {
            setEffectiveDayError("");
        }
       
        return isValid;
    };


    // eslint-disable-next-line no-lone-blocks
    {/* API Call for Previewing the PDF */ }
    const handlePreview = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post('http://hrm-service-be-1998239514.ap-south-1.elb.amazonaws.com/preview-hike', {
                employeeId: employee,
                percentage: percentage,
                reason: reason,
                approvedBy: approvedBy,
                effectiveDate: effectiveDay,
                newPosition: newPosition,
                issuedDate: currentDate,
                approvedDate: approvedDate
            },
                {
                    responseType: 'blob'
                });
            const data = response.data;
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        }
        catch (error) {
            console.log("Error in previewing PDF: " + error);
        }
    }

    // eslint-disable-next-line no-lone-blocks
    {/* API Call for Sending Email the PDF */ }
    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post('http://hrm-service-be-1998239514.ap-south-1.elb.amazonaws.com/admin/update-hike', {
                employeeId: employee,
                percentage: percentage,
                reason: reason,
                newPosition: newPosition,
                approvedBy: approvedBy,
                effectiveDate: effectiveDay,
                issuedDate: currentDate,
                approvedDate: approvedDate
            });
            const data = response.data;
            console.log(data);
            setEmailSent(true);
            window.alert("Mail sent sucessfully!");
        }
        catch (error) {
            console.log("Error in sending Mail:" + error);
        }
    }

    // eslint-disable-next-line no-lone-blocks
    {/* API Call for getting designation of an employee */ }
    const handleGetDesignation = async (e) => {
        const inputValue = e.target.value;
        setEmployee(inputValue);
        try {
            const response = await axios.get(`http://hrm-service-be-1998239514.ap-south-1.elb.amazonaws.com/admin/get-designation/${inputValue}`);
            console.log("Present Designation:" + response.data);
            setPresentDesignation(response.data);
        }
        catch (error) {
            console.log("EmployeeID in catch:" + inputValue);
            console.log("Error in getting designation for an employee:" + error);
        }
    }

    return (
        <>
            <div style={{ display: "flex" }}>
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className='hike'>
                    <div className="hike-letter flex">
                        <div className="form">
                            <form>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={employeeName}
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                        />
                                        <label className='placeholder'>Employee Name</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={employee}
                                            onChange={handleGetDesignation}
                                        />
                                        <label className='placeholder'>Employee ID</label>
                                    </div>
                                </div>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            placeholder={presentDesignation}
                                            readOnly
                                        />
                                        <label className='placeholder'>Present Designation</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={percentage}
                                            onChange={(e) => setPercentage(e.target.value)}
                                        />
                                        <label className='placeholder'>Hike Percentage</label>
                                    </div>
                                </div>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={approvedBy}
                                            onChange={(e) => setApprovedBy(e.target.value)}
                                        />
                                        <label className='placeholder'>Approved By</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={approvedDate}
                                            onChange={(e) => setApprovedDate(e.target.value)}
                                            placeholder='01-Feb-2024'
                                        />
                                        <label className='placeholder'>Approved Date</label>
                                    </div>
                                </div>
                                <div className="field-container" style={{ display: "flex" }}>
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
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={effectiveDay}
                                            onChange={(e) => setEffectiveDay(e.target.value)}
                                            placeholder='01-Feb-2024'
                                        />
                                        <label className='placeholder'>Effective Date</label>
                                    </div>
                                </div>
                                <div className="field-container" style={{ display: "flex" }}>
                                    <div className="input-container" >
                                        <input
                                            type='text'
                                            className='input'
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            style={{ width: "425px", height: "80px" }}
                                        />
                                        <label className='placeholder'>Comments</label>
                                    </div>
                                </div>
                                {promotionStatus ?
                                    (
                                        <div className="promotion-designation">
                                            <p className='p-text'>Please select the Designation for an Employee </p>
                                            <select id="myDropdown" onChange={updateTextField} className='select'>
                                                <option value='None' className='option'>
                                                    None
                                                </option>
                                                <option value="Associate Engineer" className='option'>
                                                    Associate Engineer
                                                </option>
                                                <option value="Software Engineer" className='option'>
                                                    Software Engineer
                                                </option>
                                                <option value="Senior Software Engineer" className='option'>
                                                    Senior Software Engineer
                                                </option>
                                                <option value="Lead Engineer" className='option'>
                                                    Lead Engineer
                                                </option>
                                                <option value="Junior Architect" className='option'>
                                                    Junior Architect
                                                </option>
                                                <option value="Senior Architect" className='option'>
                                                    Senior Architect
                                                </option>
                                                <option value="Engineering Manager" className='option'>
                                                    Engineering Manager
                                                </option>
                                                <option value="Project Manager" className='option'>
                                                    Project Manager
                                                </option>
                                                <option value="Delivery Manager" className='option'>
                                                    Delivery Manager
                                                </option>
                                                <option value="Associate Vice President" className='option'>
                                                    Associate Vice President
                                                </option>
                                                <option value="Vice President" className='option'>
                                                    Vice President
                                                </option>
                                                <option value="Chief Technology Officer" className='option'>
                                                    Chief Technology Officer
                                                </option>
                                                <option value="Chief Executive Officer" className='option'>
                                                    Chief Executive Officer
                                                </option>
                                            </select>
                                        </div>

                                    )
                                    :
                                    (
                                        <div className="field-container" style={{ display: "flex" }}>
                                            <div className="input-container" >
                                                <input
                                                    type='checkbox'
                                                    className='checkbox'
                                                    onChange={handlePromotionStatus}
                                                />
                                                <span className='label-for-promotion'>Include Promotion for an Employee</span>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="button">
                                    <button
                                        className='back-button'
                                        onClick={handleSendEmail}
                                    >
                                        Send Email
                                    </button>
                                    <button
                                        className='save-button'
                                        onClick={handlePreview}
                                    >
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

export default HikeForm