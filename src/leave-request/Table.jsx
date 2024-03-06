import React from 'react';
import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(employeeID, employeeName, leaveType, fromDate, toDate, days, status) {
    return { employeeID, employeeName, leaveType, fromDate, toDate, days, status };
}

const rows = [
    createData('S2C01', 'Athya Shetty', 'Sick Leave', '03-05-24', '04-05-24', '2', 'Approved'),
    createData('S2C01', 'Athya Shetty', 'Sick Leave', '03-05-24', '04-05-24', '2', 'Approved'),
    createData('S2C01', 'Athya Shetty', 'Sick Leave', '03-05-24', '04-05-24', '2', 'Approved'),
    createData('S2C01', 'Athya Shetty', 'Sick Leave', '03-05-24', '04-05-24', '2', 'Approved'),
    createData('S2C01', 'Athya Shetty', 'Sick Leave', '03-05-24', '04-05-24', '2', 'Approved'),
];


const LeaveRequestTable = () => {
    return (
        <div className='table'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='table-cell'>Employee ID</TableCell>
                            <TableCell align="right" className='table-cell'>Employee Name</TableCell>
                            <TableCell align="right" className='table-cell'>Leave Type</TableCell>
                            <TableCell align="right" className='table-cell'>From Date</TableCell>
                            <TableCell align="right" className='table-cell'>To Date</TableCell>
                            <TableCell align="right" className='table-cell'>Days</TableCell>
                            <TableCell align="right" className='table-cell'>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.employeeID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" className='table-cell-value'>
                                    {row.employeeID}
                                </TableCell>
                                <TableCell align="right" className='table-cell-value'>{row.employeeName}</TableCell>
                                <TableCell align="right" className='table-cell-value'>{row.leaveType}</TableCell>
                                <TableCell align="right" className='table-cell-value'>{row.fromDate}</TableCell>
                                <TableCell align="right" className='table-cell-value'>{row.toDate}</TableCell>
                                <TableCell align="right" className='table-cell-value'>{row.days}</TableCell>
                                <TableCell align="right" className='table-cell-value '>
                                    <span className='status-approve'>{row.status}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default LeaveRequestTable