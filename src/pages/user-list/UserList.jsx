import './list.scss';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

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
        field: 'firstName',
        headerName: 'First name',
        width: 130
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 130
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'age',
        headerName: 'Age',
        width: 100
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

const rows = [
    {
        id: 1,
        employeeid: "S2C01",
        lastName: 'Kasaram',
        firstName: 'Nandhu',
        age: 36,
        designation: "CEO",
        department: "Foundation",
        status: "Active"
    },
    {
        id: 2,
        employeeid: "S2C02",
        lastName: 'Kasaram',
        firstName: 'Prathibha',
        age: 30,
        designation: "HR",
        department: "HR",
        status: "Active"
    },
    {
        id: 3,
        employeeid: "S2C03",
        lastName: 'H',
        firstName: 'Jeevan',
        age: 26,
        designation: "Manager",
        department: "Management",
        status: "Leave"
    },
    {
        id: 4,
        employeeid: "S2C04",
        lastName: 'Javeed',
        firstName: 'Shiekh',
        age: 24,
        designation: "Associate Developer",
        department: "Backend",
        status: "Active"
    },
    {
        id: 5,
        employeeid: "S2C05",
        lastName: 'Vardhan',
        firstName: 'Harsha',
        age: 24,
        designation: "Associate Developer",
        department: "Backend",
        status: "Active"
    },
    {
        id: 6,
        employeeid: "S2C06",
        lastName: 'Deep',
        firstName: 'Akash',
        age: 25,
        designation: "Associate Developer",
        department: "Backend",
        status: "Active"
    },
    {
        id: 7,
        employeeid: "S2C07",
        lastName: 'Kumar',
        firstName: 'Arun',
        age: 24,
        designation: "Associate Developer",
        department: "Backend",
        status: "Active"
    },
    {
        id: 8,
        employeeid: "S2C08",
        lastName: 'Shree',
        firstName: 'Kavya',
        age: 25,
        designation: "Associate Developer",
        department: "Frontend",
        status: "Active"
    },
    {
        id: 9,
        employeeid: "S2C09",
        lastName: 'Reddy',
        firstName: 'Manasa',
        age: 24,
        designation: "Associate Developer",
        department: "Backend",
        status: "Active"
    },
    {
        id: 10,
        employeeid: "S2C10",
        lastName: 'G',
        firstName: 'Umesh',
        age: 25,
        designation: "Associate Developer",
        department: "Backend",
        status: "Active"
    },
    {
        id: 11,
        employeeid: "S2C11",
        lastName: 'Kumar',
        firstName: 'Nikhil',
        age: 25,
        designation: "Associate Developer",
        department: "Frontend",
        status: "Active"
    },
    {
        id: 12,
        employeeid: "S2C12",
        lastName: 'H',
        firstName: 'Yashu',
        age: 23,
        designation: "Associate Developer",
        department: "Frontend",
        status: "Active"
    },
    {
        id: 13,
        employeeid: "S2C13",
        lastName: 'Kanth',
        firstName: 'Sri',
        age: 27,
        designation: "Associate Developer",
        department: "DevOps",
        status: "Active"
    },
    {
        id: 14,
        employeeid: "S2C14",
        lastName: 'Shiekh',
        firstName: 'Reena',
        age: 23,
        designation: "Trainee",
        department: "Backend",
        status: "Leave"
    },
    {
        id: 15,
        employeeid: "S2C15",
        lastName: 'R',
        firstName: 'Akashy',
        age: 23,
        designation: "Trainee",
        department: "Backend",
        status: "Active"
    },
    {
        id: 16,
        employeeid: "S2C16",
        lastName: 'Immanuel',
        firstName: 'Vijay',
        age: 23,
        designation: "Trainee",
        department: "Backend",
        status: "Leave"
    },

];


const UserList = () => {
    const getRowClassName = (params) => {
        return params.index % 2 === 0 ? 'even-row' : 'odd-row';
    };
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
                <button className='add-employee'>Add Employee</button>
            </div>
        </div>
    )
}

export default UserList