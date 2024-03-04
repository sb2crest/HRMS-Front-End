import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './featured.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const localizer = momentLocalizer(moment);

const Featured = () => {
    
   

    return (
        <div className='featured'>
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={[
                // Your events data here
            ]}
        />
        </div>
    );
};

export default Featured;
