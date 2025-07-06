import './Admin.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../../header/Header';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';


function Admin(){

    return (
        <>
        <Header></Header>
        <div className="adminPage">
        <h1>Admin Page</h1>
        <button className='addWork'>Add Work</button>
        <button className='allWork'>View All Work</button>


        <div className='addWorkForm'>
        <h2>Add Work</h2>
        <form>
            <label htmlFor="workName">Work Name:</label>
            <input type="text" id="workName" name="workName" required />
            
            <label htmlFor="workLocation">Work Location</label>
            <input type="text" id="workLocaion" name="workLocation" required></input>

            <label htmlFor="Hourly Wage">Hourly Wage</label>
            <input type="text" id="hourlyWage" name="hourlyWage" required></input>
            
            <button type="submit">Submit</button>
        </form>

        <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        alert(JSON.stringify(formJson));
      }}
    >
      <Stack spacing={1}>
        <Input placeholder="Try to submit with no text!" required />
        <Input placeholder="It is disabled" disabled />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
        </div>
        </div>
        </>
    );
    }

export default Admin;
