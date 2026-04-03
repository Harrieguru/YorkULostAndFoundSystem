//Install Node packages
    //Node packages are not stored on git, redownload them through terminal
    //npm install must be run for both Frontend and Backend

//What to install in backend
    //npm install 

//How to run
    //In terminal tab create two terminals
    //One should CD into Frontend
    //Other should CD into backend
        //Frontend terminal runs npm run dev
        //backend terminal runs node server.js

console.log("LOADED THIS SERVER FILE");

const pool = require('./dbHandler.js');
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is alive');
});

//Test by making component do an api call
app.get('/api/test', (req, res) => {
    res.json({ message: 'nodeJS express backend is online.' });
});


//to test return do http://localhost:3000/api/testDbConnection
app.get('/api/testDbConnection', async (req, res) => {
    try{
        const data = await pool.query('select count(*) AS Working from staff');
        res.json(data.rows); 
        // Will Return {command: 'SELECT', rowCount: 2, oid: null, rows: Array(2), fields: Array(3), …} 
        //rows mean data, fields mean attributes
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
    
})



const server = app.listen(3000, () => {
    console.log('Server running on port 3000. run the frontend dev view'); 

    //backend turns off without this. DONT REMOVE.
    setInterval(() => {
        console.log('alive');
    }, 3000);

    //server wasnt working because another process was runnin in the back while hidden on port 3000
    //THE FIX: npx kill-port 3000
});
