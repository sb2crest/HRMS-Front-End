import React, { useEffect, useState } from 'react';
import './payroll.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const PayrollForm = () => {
    /* state for fields */
    const [employee, setEmployee] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [payperiod, setPayPeriod] = useState("");
    const [rentAllowance, setRentAllowance] = useState("");
    const [medicalAllowance, setMedicalAllowance] = useState("");
    const [otherAllowance, setOtherAllowance] = useState("");
    const [grossEarning, setGrossEarning] = useState("");
    const [incomeTax, setIncomeTax] = useState("");
    const [providentFund, setProvidentFund] = useState("");
    const [professionalTax, setProfessionalTax] = useState("");
    const [leaveDeduction, setLeaveDeduction] = useState("");
    const [totalDeduction, setTotalDeduction] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [payDate, setPayDate] = useState("");

    /* Calculate gross earning */
    const calculateGrossEarning = () => {
        const salary = parseFloat(basicSalary) || 0;
        const rent = parseFloat(rentAllowance) || 0;
        const medical = parseFloat(medicalAllowance) || 0;
        const other = parseFloat(otherAllowance) || 0;

        const gross = salary + rent + medical + other;
        setGrossEarning(gross.toFixed(2));
    }

    useEffect(() => {
        calculateGrossEarning();
    }, [basicSalary, rentAllowance, medicalAllowance, otherAllowance]);

    /* Calculate deduction */
    const calculateDeduction = () => {
        const income_tax = parseFloat(incomeTax) || 0;
        const provident_fund = parseFloat(providentFund) || 0;
        const professional_Tax = parseFloat(professionalTax) || 0;
        const leave_Deduction = parseFloat(leaveDeduction) || 0;

        const totalDeduction = income_tax + provident_fund + professional_Tax + leave_Deduction;
        setTotalDeduction(totalDeduction.toFixed(2));
    }

    useEffect(() => {
        calculateDeduction();
    }, [incomeTax, providentFund, professionalTax, leaveDeduction]);

    /* Total NET Payable */
    const calculateTotalAmount = () => {
        const gross_Earning = parseFloat(grossEarning) || 0;
        const total_Deduction = parseFloat(totalDeduction) || 0;

        const totalNetPay = gross_Earning - total_Deduction;
        setTotalAmount(totalNetPay.toFixed(2));
    }

    useEffect(() => {
        calculateTotalAmount();
    }, [grossEarning, totalDeduction]);

    /* Number into Words */
    const [amountInWords, setAmountInWords] = useState('');

    const NumberToWords = (number) => {
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        const convertBelowThousand = (num) => {
            if (num === 0) return '';
            if (num < 10) return units[num];
            if (num < 20) return teens[num - 10];
            const unitDigit = num % 10;
            const tensDigit = Math.floor(num / 10);
            return `${tens[tensDigit]} ${units[unitDigit]}`.trim();
        };

        const convert = (num) => {
            if (num === 0) return 'Zero';
            const billion = Math.floor(num / 1000000000);
            const million = Math.floor((num % 1000000000) / 1000000);
            const thousand = Math.floor((num % 1000000) / 1000);
            const belowThousand = num % 1000;

            let result = '';

            if (billion > 0) result += `${convertBelowThousand(billion)} Billion `;
            if (million > 0) result += `${convertBelowThousand(million)} Million `;
            if (thousand > 0) result += `${convertBelowThousand(thousand)} Thousand `;
            if (belowThousand > 0) result += `${convertBelowThousand(belowThousand)}`;

            return result.trim();
        };

        return convert(number);
    };

    useEffect(() => {
        setAmountInWords(NumberToWords(totalAmount));
    }, [totalAmount]);

    /* Adding Payroll API call */
    const [error, setError] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            console.log("employeeID:" + employeeID);
            const response = await axios.post(`http://localhost:8081/admin/add-payroll`, {
                payPeriod: payperiod,
                payDate: incomeTax,
                employeeId: employeeID,
                basic: basicSalary,
                houseRentAllowance: rentAllowance,
                medicalAllowance: medicalAllowance,
                otherAllowance: otherAllowance,
                grossEarnings: grossEarning,
                providentFund: providentFund,
                professionalTax: professionalTax,
                leaveDeduction: leaveDeduction,
                totalDeductions: totalDeduction,
                totalNetPayable: totalAmount,
            });
            const responseData = response.data;
            console.log("response:", responseData);
        } catch (error) {
            setError('Failed to Add Payroll');
            console.log("error in adding payroll:", error);
        }
    };

    return (
        <div className='payroll'>
            <div class="row">
                <div className="back-btn">
                    <Link to='/home'>
                        <button class="btn btn-lg text-center"><span><IoArrowBackCircleOutline className='icon' /></span></button>
                    </Link>
                </div>
            </div>
            <div className="container">
                <div className="form">
                    <form>
                        {/* employee details */}
                        <div class="hr-text-hr">
                            <hr class="hr-left"></hr>
                            <span class="text">Employee Details</span>
                            <hr class="hr-right"></hr>
                        </div>
                        <div className="earning-container" style={{ display: "flex" }}>
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
                                    value={employeeID}
                                    onChange={(e) => setEmployeeID(e.target.value)}
                                />
                                <label className='placeholder'>Employee ID</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={basicSalary}
                                    onChange={(e) => setBasicSalary(e.target.value)}
                                />
                                <label className='placeholder'> Basic Salary</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={payperiod}
                                    onChange={(e) => setPayPeriod(e.target.value)}
                                />
                                <label className='placeholder'>Pay Period</label>
                            </div>
                        </div>
                        <div className="earning-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={payperiod}
                                    onChange={(e) => setPayPeriod(e.target.value)}
                                />
                                <label className='placeholder'>Pay Date</label>
                            </div>
                        </div>
                        {/* allowance details */}
                        <div class="hr-text-hr">
                            <hr class="hr-left"></hr>
                            <span class="text">Allowance Details</span>
                            <hr class="hr-right"></hr>
                        </div>
                        <div className="earning-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={rentAllowance}
                                    onChange={(e) => setRentAllowance(e.target.value)}
                                />
                                <label className='placeholder'>Rent Allowance</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={medicalAllowance}
                                    onChange={(e) => setMedicalAllowance(e.target.value)}
                                />
                                <label className='placeholder'>Medical Allowance</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={otherAllowance}
                                    onChange={(e) => setOtherAllowance(e.target.value)}
                                />
                                <label className='placeholder'> Other Allowance</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={grossEarning}
                                    onChange={(e) => setGrossEarning(e.target.value)}
                                />
                                <label className='placeholder'> Gross Earning</label>
                            </div>
                        </div>
                        {/* allowance details */}
                        <div class="hr-text-hr">
                            <hr class="hr-left"></hr>
                            <span class="text">Deduction Details</span>
                            <hr class="hr-right"></hr>
                        </div>
                        <div className="deduction-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={incomeTax}
                                    onChange={(e) => setIncomeTax(e.target.value)}
                                />
                                <label className='placeholder'>Income Tax</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={providentFund}
                                    onChange={(e) => setProvidentFund(e.target.value)}
                                />
                                <label className='placeholder'>Provident Fund</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={professionalTax}
                                    onChange={(e) => setProfessionalTax(e.target.value)}
                                />
                                <label className='placeholder'> Professional Tax</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={leaveDeduction}
                                    onChange={(e) => setLeaveDeduction(e.target.value)}
                                />
                                <label className='placeholder'>Leave Deduction</label>
                            </div>
                        </div>
                        <div className="input-container">
                            <input
                                type='text'
                                className='input'
                                value={totalDeduction}
                                onChange={(e) => setTotalDeduction(e.target.value)}
                            />
                            <label className='placeholder'>Total Deduction</label>
                        </div>
                        <div class="hr-text-hr">
                            <hr class="hr-left"></hr>
                        </div>
                        <div className="total-amount">
                            <div className="div">
                                <p className='header'>TOTAL NET PAYABLE</p>
                                <p className='sub-header'>Gross Earning - Total Deduction</p>
                            </div>
                            <div className="div">
                                <p
                                    className='amount'
                                    value={totalAmount}
                                    onChange={(e) => setTotalAmount(e.target.value)}
                                >
                                    ₹ {totalAmount}
                                </p>
                                <p className='sub-header'>Indian Rupee {amountInWords} Only</p>
                            </div>
                        </div>
                        <div className="button">
                            <Link to="/home">
                                <button className='back-button'>Back To Home</button>
                            </Link>
                            <button className='save-button' onClick={handleSave}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PayrollForm