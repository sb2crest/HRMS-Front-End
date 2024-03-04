import React from 'react';
import './widget.scss';
import UpcomingIcon from '@mui/icons-material/Upcoming';

const UpcomingSalaryWidget = ({ upcomingSalaryDate }) => {

    /* conversion of date into date month year format */
    const dateFormatRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!dateFormatRegex.test(upcomingSalaryDate)) {
        return <div className='upcoming-widget'>Invalid Date Format</div>;
    }
    const [_, day, month, year] = upcomingSalaryDate.match(dateFormatRegex);
    const getMonthName = (monthNum) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[parseInt(monthNum, 10) - 1];
    };
    const formattedDate = `${day} ${getMonthName(month)} ${year}`;

    return (
        <div className='upcoming-widget'>
            <div className='center'>
                <div className='left'>
                    <UpcomingIcon className='icon' />
                </div>
                <div className='right'>
                    <span className='total'>{formattedDate}</span>
                    <span className='title'>Upcoming Salary Date</span>
                </div>
            </div>
        </div>
    )
}

export default UpcomingSalaryWidget