import React, { useState } from 'react';
import './addemployee.scss';
import img from '../../images/new-employeee.jpg';
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmailID] = useState("");
    const [location, setLocation] = useState("");
    const [bank, setBank] = useState("");
    const [department, setDepartment] = useState("");
    const [account, setAccount] = useState("");
    const [doj, setDOJ] = useState("");
    const [grossSalary, setGrossSalary] = useState("");

    {/*API Call for Saving an Employee */ }
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/admin/add', {
                employeeName: name,
                designation: designation,
                location: location,
                bankName: bank,
                department: department,
                accountNo: account,
                dateOfJoin: doj,
                email: email,
                grossSalary: grossSalary
            });
            console.log("Response from API Call:" + response.data);
        }
        catch (error) {
            console.log("error in saving employee details:" + error);
        }

    }

    return (
        <div className='add-employee'>
            <div className="employee flex">
                <div className="side-img">
                    <img src={img} alt="image" className='img' />
                </div>
                <div className="form">
                    <form>
                        <div className="field-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className='placeholder'>Employee Name</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                />
                                <label className='placeholder'>Designation</label>
                            </div>
                        </div>
                        <div className="field-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    style={{ width: "400px" }}
                                    value={email}
                                    onChange={(e) => setEmailID(e.target.value)}
                                />
                                <label className='placeholder'>Email ID</label>
                            </div>
                        </div>
                        <div className="field-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <label className='placeholder'>Location</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={bank}
                                    onChange={(e) => setBank(e.target.value)}
                                />
                                <label className='placeholder'>Bank Name</label>
                            </div>
                        </div>
                        <div className="field-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                <label className='placeholder'>Department</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                />
                                <label className='placeholder'>Account Number</label>
                            </div>
                        </div>
                        <div className="field-container" style={{ display: "flex" }}>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={doj}
                                    onChange={(e) => setDOJ(e.target.value)}
                                />
                                <label className='placeholder'>DOJ</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type='text'
                                    className='input'
                                    value={grossSalary}
                                    onChange={(e) => setGrossSalary(e.target.value)}
                                />
                                <label className='placeholder'>Gross Salary</label>
                            </div>
                        </div>
                        <div className="button">
                            <button className='save-button' onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee