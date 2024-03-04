import React from 'react';
import CoPresentIcon from '@mui/icons-material/CoPresent';

const AttendenceWidget = () => {
    return (
        <div className='attendence-widget'>
            <div className='center'>
                <div className='left'>
                    <CoPresentIcon className='icon' />
                </div>
                <div className='right'>
                    <span className='total'>15</span>
                    <span className='title'>Logged In Employees</span>
                </div>
            </div>
        </div>
    )
}

export default AttendenceWidget