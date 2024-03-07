import React, { useEffect, useState } from 'react';
import './addemployee.scss';
import axios from 'axios';
import SideBar from '../../components/sidebar/SideBar';
import { CgProfile } from "react-icons/cg";
import { IoMdPersonAdd } from "react-icons/io";

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
    const [UAN, setUAN] = useState("");
    const [PF, setPF] = useState("");
    const [errors, setErrors] = useState({});
    const [alreadyexisting, setAlreadyExisting] = useState(false);
    const [newJoinee, setnewJoinee] = useState(false);
    const [role, setRole] = useState(false);

    const handleExist = (e) => {
        e.preventDefault();
        setAlreadyExisting(true);
        setnewJoinee(false);
        setRole(false);
    }

    const handleNew = (e) => {
        e.preventDefault();
        setAlreadyExisting(false);
        setnewJoinee(true);
        setRole(false);
    }

    const handleRole = () => {
        setRole(true);
        setAlreadyExisting(false);
        setnewJoinee(false);
    }

    useEffect(() => {
        handleRole();
    }, [])

    const validateFormData = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Employee Name is required';
        if (!designation) newErrors.designation = 'Designation is required';
        if (!email) newErrors.email = 'Email is required';
        if (!location) newErrors.location = 'Location is required';
        if (!bank) newErrors.bank = 'Bank Name is required';
        if (!department) newErrors.department = 'Department is required';
        if (!account) newErrors.account = 'Account Number is required';
        if (!doj) newErrors.doj = 'DOJ is required';
        if (!grossSalary) newErrors.grossSalary = 'Gross Salary is required';
        return newErrors;
    };

    {/*API Call for Saving an Employee */ }
    const handleSave = async (e) => {
        e.preventDefault();
        const newErrors = validateFormData();
        if (Object.keys(newErrors).length === 0) {
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
                console.log("Response from API Call:", response.data);
                alert('Form submitted successfully');
            } catch (error) {
                console.log("error in saving employee details:", error);
                alert('Error occurred while saving employee details');
            }
        } else {
            setErrors(newErrors);
            Object.values(newErrors).forEach(error => {
                alert(error);
            });
        }
    };
    {/* Clear Form */ }
    const handleClear = (e) => {
        e.preventDefault();
        setName("");
        setDesignation("");
        setEmailID("");
        setLocation("");
        setBank("");
        setDepartment("");
        setAccount("");
        setDOJ("");
        setGrossSalary("");
    }

    const handleGoBack = (e) => {
        e.preventDefault();
        setRole(true);
    }

    return (
        <div style={{ display: "flex" }}>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className='add-employee'>
                {role ?
                    (
                        <>
                            <div className="role-container">
                                <div className="p-container">
                                    <p className='p-text'>Add an Employee or New Joinee</p>
                                </div>
                                <div className="role">
                                    <div className="div" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                        <div className="admin" onClick={handleExist}>
                                            <CgProfile className='icon' />
                                        </div>
                                        <span className="roles">Employee</span>
                                    </div>
                                    <div className="div" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                        <div className="admin" onClick={handleNew}>
                                            <IoMdPersonAdd className='icon' />
                                        </div>
                                        <span className="roles">Trainee</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // <div className="employee flex">
                        <div>
                            {/* <form> */}
                            {alreadyexisting ? (
                                <div className="employee flex">
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
                                                <div className="input-container">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                    />
                                                    <label className='placeholder'>Location</label>
                                                </div>
                                            </div>
                                            <div className="field-container" style={{ display: "flex" }}>
                                                <div className="input-container">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={email}
                                                        onChange={(e) => setEmailID(e.target.value)}
                                                    />
                                                    <label className='placeholder'>Email ID</label>
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
                                                        value={account}
                                                        onChange={(e) => setAccount(e.target.value)}
                                                    />
                                                    <label className='placeholder'>Account Number</label>
                                                </div>
                                                <div className="input-container">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={UAN}
                                                        onChange={(e) => setUAN(e.target.value)}
                                                    />
                                                    <label className='placeholder'>UAN Number</label>
                                                </div>
                                                <div className="input-container">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={PF}
                                                        onChange={(e) => setPF(e.target.value)}
                                                    />
                                                    <label className='placeholder'>PF Number</label>
                                                </div>
                                            </div>
                                            <div className="field-container" style={{ display: "flex" }}>
                                                <div className="input-container">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={doj}
                                                        placeholder='01-Feb-2024'
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
                                                <button className='save-button' onClick={handleGoBack}>
                                                    Select Role
                                                </button>
                                                <button className='save-button' onClick={handleClear}>
                                                    Clear
                                                </button>
                                                <button className='save-button' onClick={handleSave}>
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="trainee flex">
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
                                                <div className="input-container">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                    />
                                                    <label className='placeholder'>Location</label>
                                                </div>
                                            </div>
                                            <div className="field-container" style={{ display: "flex" }}>
                                                <div className="input-container">
                                                    <input
                                                        type='text'
                                                        className='input'
                                                        value={email}
                                                        onChange={(e) => setEmailID(e.target.value)}
                                                    />
                                                    <label className='placeholder'>Email ID</label>
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
                                                        value={doj}
                                                        placeholder='01-Feb-2024'
                                                        onChange={(e) => setDOJ(e.target.value)}
                                                    />
                                                    <label className='placeholder'>DOJ</label>
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
                                                <button className='save-button' onClick={handleGoBack}>
                                                    Select Role
                                                </button>
                                                <button className='save-button' onClick={handleClear}>
                                                    Clear
                                                </button>
                                                <button className='save-button' onClick={handleSave}>
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {/* </form> */}
                            {/* </div> */}
                        </div>
                    )
                }
            </div>
        </div >
    )
}
export default AddEmployee