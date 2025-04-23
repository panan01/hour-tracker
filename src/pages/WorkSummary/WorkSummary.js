import * as React from 'react';
import { useEffect, useState } from 'react';
import './WorkSummary.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../../header/Header';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';




export default function WorkSummary() {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [workLog, setWorkLog] = useState([]);
    const [totalHours, setTotalHours] = useState(0);


    useEffect(() => {
        handleFetchWorkLog();

    }, [startDate, endDate]);

    useEffect(() => {
        var workhr = workLog.reduce((sum, { worked_hour }) => sum + Number(worked_hour), 0);
        setTotalHours(workhr.toFixed(2))

    }, [workLog]);
    const handleFetchWorkLog = () => {
        const body = {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
        };

        fetch('http://an-pan.me:5000/time_registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => setWorkLog(data))
            .catch((error) => console.error('Error:', error));
        console.log('workLog:', workLog);
    };

    return (
        <>
            <Header />
            <div className="workSummary">
                <h1>Work Summary</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="datePicker">
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </div>
                    <div className="datePicker">
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                        />
                    </div>
                </LocalizationProvider>
                <div className='table'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 350 }} size="large" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="left">Start Time</TableCell>
                                    <TableCell align="left">End Time</TableCell>
                                    <TableCell align="left">Hours</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workLog.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.work_date}</TableCell>
                                        <TableCell align="left">{item.start_time}</TableCell>
                                        <TableCell align="left">{item.end_time}</TableCell>
                                        <TableCell align="left">{item.worked_hour}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"><a className='total'>Total</a></TableCell>
                                    <TableCell align="left" ><a className="total_number">{totalHours}</a></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"><a className='total'>EI.</a></TableCell>
                                    <TableCell align="left" ><a className="total_number">{(totalHours * 15.3).toFixed(2)}</a></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

        </>
    );
}
