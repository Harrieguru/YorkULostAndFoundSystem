//Install Node packages
    //Node packages are not stored on git, redownload them through terminal
    //npm install must be run for both Frontend and Backend

//What to install in backend
    //RUN: npm install 

//How to run
    //In terminal tab create two terminals
    //One should CD into Frontend
    //Other should CD into backend
        //Frontend terminal runs: npm run dev
        //backend terminal runs: node server.js

console.log("LOADED THIS SERVER FILE");

const pool = require('./dbHandler.js');
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
const testingRoutes = require('./testRoutes.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is alive');
});


//debugging tool
//USE POSTMAN to test API calls
//use: http://localhost:3000[insert API] ie. http://localhost:3000/api/test/server-is-online
app.use('/api/test', testingRoutes);

app.get('/api/production/all-lost-items', async (req, res) => {
    try{
        const data = await pool.query(`
            SELECT *
            FROM lost_items    
        `);

        res.json(data.rows);
    }
    catch (err){
        res.status(500).send(err);
    }
});

app.get('/api/production/all-item-claims', async (req, res) => {
    try{
        const data = await pool.query(`
            SELECT 
                ic.claim_status, li.item_category, li.item_type, 
                li.brand, li.material, li.primary_colour,
                li.description, li.date_found, li.location_found,
                p.first_name, p.last_name
            FROM item_claim ic
            JOIN lost_items li on ic.item_id = li.item_id
            JOIN basic_user bu on bu.user_id = ic.user_id
            JOIN person p on p.person_id = bu.person_id;    
        `);
        res.json(data.rows);
    }
    catch(err){
        res.status(500).send(err);
    }
});

app.get('/api/production/all-item-reports', async (req, res) => {
    try{
        const data = await pool.query(`
            SELECT 
                lir.report_date, lir.item_category, lir.item_type, 
                lir.brand, lir.primary_colour, lir.description, 
                lir.date_lost, lir.location_lost, lir.report_status, 
                p.first_name, p.last_name 
            FROM lost_item_report lir 
            JOIN basic_user bu ON lir.user_id = bu.user_id 
            JOIN person p ON bu.person_id = p.person_id;
        `);
        res.json(data.rows);
    }
    catch(err){
        res.status(500).send(err);
    }
});

const server = app.listen(3000, () => {
    console.log('Server running on port 3000. run the frontend dev view'); 

    //server wasnt working because another process was runnin in the back while hidden on port 3000
    //THE FIX: npx kill-port 3000
});
