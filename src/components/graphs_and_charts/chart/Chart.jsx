import React, { useEffect, useState } from 'react';
import './chart.scss';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Chart = () => {
    const [payrollData, setPayrollData] = useState([]);

    useEffect(() => {
        getPayrollData();
    }, []);

    /* API Integration for Fetching Data */
    const getPayrollData = async () => {
        try {
            const response = await axios.get('http://hrm-service-BE-2051988075.ap-south-1.elb.amazonaws.com/admin/salary-graph');
            const responseData = response.data;
            console.log("responseData for payroll history:", responseData);
            const newData = [
                { month: "Origin", averageSalary: 0 },
                ...responseData
            ];
            setPayrollData(newData);
        } catch (error) {
            console.log("Error in fetching payroll data:", error);
        }
    }

    return (
        <div className='chart'>
            <div className="title">Payroll History (Last 6 Months)</div>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={payrollData} margin={{ top: 12, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FFBF00" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke='gray' />
                    <CartesianGrid strokeDasharray="3 3" className='class-grid' />
                    <Tooltip />
                    <Area type="monotone" dataKey="averageSalary" stroke="orange" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart;
