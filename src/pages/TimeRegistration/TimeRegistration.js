import './TimeRegistration.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../../header/Header';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/material/Button';


function TimeRegistration() {
    const [date, setDate] = useState(dayjs(Date.Date));
    const [startTime, setStartTime] = useState(dayjs(Date.Time))
    const [endTime, setEndTime] = useState(dayjs(Date.Time))
    var [workedTime, setWorkedTime] = useState(0);

    useEffect(() => {
        var diff = endTime.diff(startTime, 'minute');
        diff = diff/60;
        setWorkedTime(diff.toFixed(2));
    }, [startTime,endTime,workedTime]); 

    const hendleSubmit = () => {
        // Send POST request to the server
        const data = {
            date: date.format('YYYY-MM-DD'),
            startTime: startTime.format('HH:mm'),
            endTime: endTime.format('HH:mm'),
            workedTime: workedTime
        }
        fetch('http://localhost:5000/time_registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            window.alert('Time Registration Submitted');
        })
    }

    return (
        <>
        <Header></Header>
        <div className="TimeRegistration">
        <h1>Time Registration</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div components={['DatePicker', 'DatePicker']} className='datePicker'>
            <DatePicker
            label="Work Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            />
        </div>
        <div components={['TimePicker', 'TimePicker']} className='timePickerDiv'>
            <div className='timePicker'>
            <TimePicker
            label="Start Time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            />
            </div>
            <div className='timePicker'>
            <TimePicker
            label="End Time"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            />
            </div>
        </div>
        </LocalizationProvider>
        <div className='workedTime'>
            <p>Worked Time:</p>
            <p className='hour'>{workedTime} </p>
            <p>hours</p>
        </div>
              <Button variant="contained" onClick={hendleSubmit}>Submit</Button>

        </div>
        </>
    );
    }

export default TimeRegistration;


