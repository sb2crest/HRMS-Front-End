import React, { useState } from 'react';
import './hikeform.scss';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import SideBar from '../../components/sidebar/SideBar';

const HikeForm = () => {
    const [employee, setEmployee] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [percentage, setPercentage] = useState("");
    const [approvedBy, setApprovedBy] = useState("");
    const [effectiveDay, setEffectiveDay] = useState("");
    const [reason, setReason] = useState("");
    const [promotionStatus, setPromotionStatus] = useState(false);
    const [emailsent, setEmailSent] = useState(false);
    const [presentDesignation, setPresentDesignation] = useState("");
    const [newPosition, setNewPosition] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [approvedDate, setApprovedDate] = useState("");

    const handlePromotionStatus = () => {
        setPromotionStatus(true);
    }

    {/* Dropdown Function */ }
    function updateTextField() {
        var dropdown = document.getElementById("myDropdown");
        var selectedValue = dropdown.options[dropdown.selectedIndex].text;
        setNewPosition(selectedValue);
    }


    /* Email successfully sent */
    const handleSnackbarClose = (
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setEmailSent(false);
    };


    {/* API Call for Previewing the PDF */ }
    const handlePreview = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/admin/preview-hike', {
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

    {/* API Call for Sending Email the PDF */ }
    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/admin/update-hike', {
                employeeId: employee,
                percentage: percentage,
                reason: reason,
                approvedBy: approvedBy,
                effectiveDate: effectiveDay,
                issuedDate: currentDate,
                approvedDate: approvedDate
            });
            const data = response.data;
            console.log(data);
            setEmailSent(true);
        }
        catch (error) {
            console.log("Error in sending Mail:" + error);
        }
    }

    {/* API Call for getting designation of an employee */ }
    const handleGetDesignation = async (e) => {
        const inputValue = e.target.value;
        setEmployee(inputValue);
        console.log("EmployeeID:" + inputValue);
        try {
            const response = await axios.get(`http://localhost:8081/admin/get-designation/${inputValue}`);
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
                                        />
                                        <label className='placeholder'>Issued Date</label>
                                    </div>
                                    <div className="input-container">
                                        <input
                                            type='text'
                                            className='input'
                                            value={effectiveDay}
                                            onChange={(e) => setEffectiveDay(e.target.value)}
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
                                    <Snackbar
                                        open={emailsent}
                                        // autoHideDuration={6000}
                                        onClose={handleSnackbarClose}
                                        message="Email Sent Successfully"
                                        SnackbarContentProps={{
                                            style: { backgroundColor: 'green' }
                                        }}
                                        style={{ minWidth: '200px' }}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    />
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