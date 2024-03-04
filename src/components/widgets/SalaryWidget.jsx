import React from 'react';
import './widget.scss';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const SalaryWidget = ({ averageSalary }) => {

    /* conversion of salary into Indian system */
    if (averageSalary === null || averageSalary === undefined) {
        return <div className='salary-widget'>Salary information unavailable</div>;
    }
    const formattedSalary = averageSalary.toLocaleString('en-IN');

    return (
        <div className='salary-widget'>
            <div className='center'>
                <div className='left'>
                    <CurrencyRupeeIcon className='icon' />
                </div>
                <div className='right'>
                    <span className='total'>{formattedSalary}</span>
                    <span className='title'>Average Salary</span>
                </div>
            </div>
        </div>
    )
}

export default SalaryWidget