import './list.scss';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 85,
    },
    {
        field: 'employeeid',
        headerName: 'Employee ID',
        width: 120
    },
    {
        field: 'employeename',
        headerName: 'Employee Name',
        width: 190
    },
    {
        field: 'doj',
        headerName: 'DOJ',
        width: 150
    },
    {
        field: 'designation',
        headerName: 'Designation',
        width: 180
    },
    {
        field: 'department',
        headerName: 'Department',
        width: 150
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150
    },
    {
        field: 'grossSalary',
        headerName: 'Gross Salary',
        width: 150
    },
    {
        field: 'nextHikeDate',
        headerName: 'Next Hike Date',
        width: 150
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: (params) => (
            <div className={`status-${params.value.toLowerCase()}`}>
                {params.value}
            </div>
        )
    }
];

const UserList = () => {

    const getRowClassName = (params) => {
        return params.index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    const [rows, setRows] = useState([]);

    useEffect(() => {
        handleShowList()
    },[])

    {/* API Call for Showing employee List */ }
    const handleShowList = async () => {
        try {
            const response = await axios.get('http://localhost:8081/admin/all');
            console.log("Employee list:", response.data);
            const mappedRows = response.data.map((employee, index) => ({
                id: index + 1,
                employeeid: employee.employeeID,
                employeename: employee.employeeName,
                location: employee.location,
                designation: employee.designation,
                status: employee.status,
                doj: employee.dateOfJoin,
                department: employee.department,
                email: employee.email,
                grossSalary: employee.grossSalary,
                nextHikeDate: employee.nextHikeDate
            }));
            setRows(mappedRows);
        }
        catch (error) {
            console.log("Error in showing List:" + error)
        }
    }

    return (
        <div className="div">
            <div className='employee-list' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
                <div style={{ height: 400, width: '100%' }} className='employee-grid'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowClassName={getRowClassName}

                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            </div>
            <div className="button">
                <Link to="/home">
                    <button className='back'>Back To Home</button>
                </Link>
                <Link to='/add-employee'>
                    <button className='add'>Add Employee</button>
                </Link>
            </div>
        </div>
    )
}

export default UserList