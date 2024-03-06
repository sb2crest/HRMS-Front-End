import React from 'react';
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LogoutIcon from '@mui/icons-material/Logout';
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { BsGraphUpArrow } from "react-icons/bs";

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='center'>
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className='icon' />
                        <Link to='/home' style={{ textDecoration: "none" }}>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <p className="title">LISTS</p>
                    <Link to="/userlist" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className='icon' />
                            <span>Employee List</span>
                        </li>
                    </Link>
                    <Link to='/add-employee' style={{ textDecoration: "none" }}>
                        <li>
                            <MdOutlinePersonAddAlt className='icon' />
                            <span>Add Employee</span>
                        </li>
                    </Link>
                    <p className="title">Status</p>
                    <li>
                        <QueryStatsIcon className='icon' />
                        <span>Stats</span>
                    </li>
                    <li>
                        <EqualizerIcon className='icon' />
                        <span>Logs</span>
                    </li>
                    <li>
                        <NotificationsIcon className='icon' />
                        <span>Notifications</span>
                    </li>
                    <p className="title">SERVICES</p>
                    <Link to='/offerletter' style={{ textDecoration: "none" }}>
                        <li>
                            <SlEnvolopeLetter className='icon' />
                            <span>Offer Letter</span>
                        </li>
                    </Link>
                    <li>
                        <CurrencyRupeeOutlinedIcon className='icon' />
                        <Link to="/payroll" style={{ textDecoration: "none" }}>
                            <span>Payroll</span>
                        </Link>
                    </li>
                    <Link to='/hikeletter' style={{ textDecoration: "none" }}>
                        <li>
                            <BsGraphUpArrow className='icon' />
                            <span>Hike Letter</span>
                        </li>
                    </Link>
                    <p className="title">ADMIN</p>
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <li>
                            <LogoutIcon className='icon' />
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default SideBar