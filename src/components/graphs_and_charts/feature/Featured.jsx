import React, { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './featured.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const Featured = () => {
    const [eventsByDate, setEventsByDate] = useState({});

    // API Call for getting monthly events
    const handleGetEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8081/calendar/events-by-month?month=March 2024');
            const formattedEvents = response.data.reduce((acc, event) => {
                const date = moment(event.date).format('YYYY-MM-DD');
                acc[date] = [...(acc[date] || []), { title: event.event }];
                return acc;
            }, {});
            setEventsByDate(formattedEvents);
        } catch (error) {
            console.log("Error in getting events of this particular month", error);
        }
    };

    useEffect(() => {
        handleGetEvents();
    }, []);

    return (
        <div className='featured'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={Object.entries(eventsByDate).flatMap(([date, events]) =>
                    events.map(event => ({ ...event, date }))
                )}
            />
        </div>
    );
};

export default Featured;
