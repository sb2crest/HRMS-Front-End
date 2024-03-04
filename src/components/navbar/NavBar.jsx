import React from 'react';
import './navbar.scss';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import avatar from '../../images/avatar-img.webp';

const NavBar = ({ currentDate }) => {

  /* conversion of date into date month year format */
  const dateFormatRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
  if (!dateFormatRegex.test(currentDate)) {
    return <div className='upcoming-widget'>Invalid Date Format</div>;
  }
  const [_, day, month, year] = currentDate.match(dateFormatRegex);
  const getMonthName = (monthNum) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(monthNum, 10) - 1];
  };
  const formattedDate = `${day} ${getMonthName(month)} ${year}`;

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='header'>
          <p className='welcome'>
            Welcome
            <span className='admin'> Back !</span>
          </p>
          <p className='date'>
            {formattedDate}
          </p>

        </div>
        <div className='items'>
          <div className='item'>
            <DarkModeIcon className='icon' />
          </div>
          <div className='item'>
            <NotificationsIcon className='icon' />
            <div className="counter">1</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineIcon className='icon' />
            <div className="counter">2</div>
          </div>
          <div className='item'>
            <ListOutlinedIcon className='icon' />
          </div>
          <div className='item'>
            <img
              src={avatar}
              alt="avatar"
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar