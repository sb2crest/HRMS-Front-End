import React, { useEffect, useState } from 'react';
import './home.scss';
import SideBar from '../../components/sidebar/SideBar';
import NavBar from '../../components/navbar/NavBar';
import UserWidget from '../../components/widgets/UserWidget';
import UpcomingSalaryWidget from '../../components/widgets/UpcomingSalaryWidget';
import SalaryWidget from '../../components/widgets/SalaryWidget';
import AttendenceWidget from '../../components/widgets/AttendenceWidget';
import axios from 'axios';
import Featured from '../../components/graphs_and_charts/feature/Featured';
import Chart from '../../components/graphs_and_charts/chart/Chart';
import Attendance from '../../components/attendance/Attendance';
import Table from '../../leave-request/Table';

const Home = () => {
  const [averageSalary, setAverageSalary] = useState(null);
  const [noOfEmployees, setNoOfEmployees] = useState(null);
  const [todayDate, setTodayDate] = useState(null);

  useEffect(() => {
    loadDetails();
  })

  const loadDetails = async () => {
    try {
      const response = await axios.get('http://hrm-service-BE-2051988075.ap-south-1.elb.amazonaws.com/admin');
      const responseData = response.data;
      setAverageSalary(parseFloat(responseData.averageSalary));
      setNoOfEmployees(responseData.noOfEmployees);
      setTodayDate(responseData.todayDate);
    }
    catch (error) {
      console.log("Error in Loading Details:" + error);
    }
  }

  return (
    <div className='home'>
      <div className="sidebar" data-testid="sidebar">
        <SideBar />
      </div>
      <div className="homeContainer">
        <NavBar currentDate={todayDate} />
        <div className="widgets">
          <UserWidget employees={noOfEmployees} />
          <SalaryWidget averageSalary={averageSalary} />
          <UpcomingSalaryWidget upcomingSalaryDate={todayDate} />
          <AttendenceWidget />
        </div>
        <div className="attendance-charts">
          <Attendance />
          <Chart />
        </div>
        <div className="charts">
          <Featured />
        </div>
        <div className="leave-request-table">
          <div className="leave-container">
            Leave Requests
          </div>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Home