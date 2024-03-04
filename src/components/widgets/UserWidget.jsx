import React from 'react';
import './widget.scss';
import GroupsIcon from '@mui/icons-material/Groups';

const UserWidget = ({ employees }) => {
    return (
        <div className='user-widget'>
            <div className='center'>
                <div className='left'>
                    <GroupsIcon className='icon' />
                </div>
                <div className='right'>
                    <span className='total'>{employees}</span>
                    <span className='title'>Total Employees</span>
                </div>
            </div>
        </div>
    )
}

export default UserWidget;