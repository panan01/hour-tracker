import "./WorkSummary.css";
import React from "react";
import { useEffect, useState } from "react";
import Header from "../../header/Header";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function WorkSummary() {
    const [fromDate, setFromDate] = useState(dayjs(Date.Date));
    const [tillDate, setTillDate] = useState(dayjs(Date.Date));
    
    
    const handleRequest = () => {
        // Send POST request to the server
        const data = {
            fromDate: fromDate.format('YYYY-MM-DD'),
            tillDate: tillDate.format('YYYY-MM-DD')
        }
        fetch('http://localhost:5000/work_summary', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            // render the response into a table
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // render the response into a table
            
        }
        )
    }


    return (
        <>
            <Header></Header>
            <div className="WorkSummary">
                <h1>Work Summary</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div components={["DatePicker", "DatePicker"]} className="datePicker">
                        <DatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                        />
                        <DatePicker
                            label="Till Date"
                            value={tillDate}
                            onChange={(newValue) => setTillDate(newValue)}
                            />
                    </div>
                    <button onClick={handleRequest}>Extract</button>
                </LocalizationProvider>
            </div>
        </>
    );
}

export default WorkSummary;