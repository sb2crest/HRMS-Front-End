import React, { useEffect, useState } from 'react';
import './payroll.scss';
import axios from 'axios';
import SideBar from '../../components/sidebar/SideBar';

const PayrollForm = () => {
    /* state for fields */
    const [employee, setEmployee] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [payperiod, setPayPeriod] = useState("");
    const [incomeTax, setIncomeTax] = useState("");
    const [leaveDeduction, setLeaveDeduction] = useState("");
    const [totalDeduction, setTotalDeduction] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [payDate, setPayDate] = useState("");
    const [LOP, setLOP] = useState("");
    const [paidDays, setPaidDays] = useState(0);

    {/* Clear Form */ }
    const handleClear = (e) => {
        e.preventDefault();
        setEmployee("");
        setEmployeeID("");
        setBasicSalary("");
        setPayPeriod("");
        setIncomeTax("");
        setLeaveDeduction("");
        setTotalDeduction("");
        setTotalAmount("");
        setPayDate("");
    }

    {/* Form Validation */ }

    /* Validation function */
    const validateInputs = () => {
        let errors = {};

        if (!employee) {
            errors.employee = 'Employee name is required';
        }
        if (!employeeID) {
            errors.employeeID = 'Employee ID is required';
        }
        if (!payperiod) {
            errors.payperiod = 'Pay Period is required';
        }
        if (!payDate) {
            errors.payDate = 'Pay Date is required';
        }
        return errors;
    };


    {/* API Call for Fetching name from ID  */ }
    const handleGetNameByID = async (inputValue) => {
        console.log("emp ID:" + inputValue);
        try {
            const response = await axios.get(`http://hrm-service-BE-2051988075.ap-south-1.elb.amazonaws.com/employee/get-by-id?empId=${inputValue}`);
            setEmployee(response.data.employeeName);
        } catch (error) {
            console.log("Error in fetching employee name:", error);
        }
    }

    {/* Function for handling Employee ID OnChange */ }
    const handleEmployeeIDChange = (e) => {
        const employeeid = e.target.value;
        setEmployeeID(employeeid);
        handleGetNameByID(employeeid);
    }

    {/* API Call for PDF preview  */ }
    const handlePreview = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://hrm-service-BE-2051988075.ap-south-1.elb.amazonaws.com/admin/preview-new-payslip', {
                    employeeId: employeeID,
                    payPeriod: payperiod,
                    payDate: payDate,
                    lopDays: LOP
                }
                    ,
                    {
                        responseType: 'blob'
                    }
                );
                const data = response.data;
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            }
            catch (error) {
                console.log("Error in preview of payslip:", error);
            }
        }
        else {
            Object.keys(validationErrors).forEach(field => {
                window.alert(validationErrors[field]);
            });
        }

    }

    {/* Calculate Paid Days */ }
    const handlePaidDays = () => {
        if (!LOP) {
            setPaidDays(0);
            return;
        }
        const [monthStr, yearStr] = payperiod.split(' ');
        const month = new Date(Date.parse(monthStr + ' 1, ' + yearStr)).getMonth();
        const totalDaysInMonth = new Date(new Date(yearStr, month + 1, 0).getDate());
        const paidDays = totalDaysInMonth - LOP;
        setPaidDays(paidDays);
    }
    useEffect(() => {
        handlePaidDays()
    }, [LOP]);

    {/* API Call for sending PDF  and saving particular payroll */ }
    const handleSaveAndSendPayRoll = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://hrm-service-BE-2051988075.ap-south-1.elb.amazonaws.com/admin/add-new-payroll', {
                    employeeId: employeeID,
                    payPeriod: payperiod,
                    payDate: payDate,
                    lopDays: LOP
                })
                console.log(response.data);
            }
            catch (error) {
                console.log("Error in Sending PDF :", error);
            }
        }
        else {
            Object.keys(validationErrors).forEach(field => {
                window.alert(validationErrors[field]);
            });
        }
    }

    return (
        <div style={{ display: "flex" }}>
            {/* start : Side Bar */}
            <div className="sidebar">
                <SideBar />
            </div>
            {/* end : Side Bar */}
            <div className='payroll'>
                <div className="container">
                    <div className="form">
                        {/* start : PaySlip Form */}
                        <form>
                            <div className="earning-container" style={{ display: "flex" }}>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={employee}
                                        placeholder={employee}
                                        readOnly
                                    />
                                    <label className='placeholder'>Employee</label>
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
                            <div className="deduction-container" style={{ display: "flex" }}>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={payperiod}
                                        onChange={(e) => setPayPeriod(e.target.value)}
                                        placeholder='March 2024'
                                    />
                                    <label className='placeholder'>Pay Month</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={payDate}
                                        onChange={(e) => setPayDate(e.target.value)}
                                        placeholder='01-Mar-2024'
                                    />
                                    <label className='placeholder'>Pay Date</label>
                                </div>
                            </div>
                            <div className="deduction-container" style={{ display: "flex" }}>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={LOP}
                                        onChange={(e) => setLOP(e.target.value)}
                                    />
                                    <label className='placeholder'>Loss of Pay</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        type='text'
                                        className='input'
                                        value={paidDays}
                                        placeholder={paidDays}
                                        readOnly
                                    />
                                    <label className='placeholder'>Paid Days</label>
                                </div>
                            </div>
                            {/* start : Button */}
                            <div className="button">
                                <button className='back-button' onClick={handlePreview} >Preview PDF</button>
                                <button className='save-button' onClick={handleSaveAndSendPayRoll} >Send PDF</button>
                                <button className='clear-button' onClick={handleClear}>Clear</button>
                            </div>
                            {/* end : Button */}
                        </form>
                        {/* end : PaySlip Form */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayrollForm