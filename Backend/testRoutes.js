//debugging tool
//USE POSTMAN to test API calls

const express = require('express');
const router = express.Router();
const pool = require('./dbHandler.js');
const bcrypt = require('bcrypt');


async function validatePassword(password, theHash){
    const isValid = await bcrypt.compare(password, theHash);
    console.log(isValid + ' Inputed Password Matches the Hash');
    return isValid;
}

//FULL: /api/test/server-is-online
router.get('/server-is-online', (req, res) => {
    res.json({ message: 'nodeJS express backend is online.' });
});

//FULL: /api/test/login-auth
router.get('/login-auth', async (req, res) => {
    const user = 'student';
    const pass = 'student';

    try {
        //Find hash stored in db for an account
        const data = await pool.query(`
            SELECT * 
            FROM passport_york 
            WHERE university_username = $1`, 
            
            [user]);
        
        if (data.rows.length === 0) {
            return res.status(401).json({ 'incorrectUsername': 'User not in database' });
        }

        const hashedPass = data.rows[0].university_pass_hash;
        const isPassValid = await validatePassword(pass, hashedPass);
        
        if(isPassValid === false){
            return res.status(401).json({ 'incorrectPassword': 'password not in database' });
        }

        res.json({'validPassword': isPassValid, 'enteredPassword': pass, 'status': 'password has matched its hash'});
        
    } catch(err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



//FULL: /api/test/sending-fake-data
router.post('/sending-fake-data', async (req, res) => {
    try{
        //sending to table dummy_for_backend_testing
        const color = 'purple';
        const number = '19';
        const isEven = false;

        const dataToSend = await pool.query(`
            INSERT INTO dummy_for_backend_testing (color, number, is_even) 
            VALUES ($1, $2, $3)`
            ,[color, number, isEven]);

        res.json(dataToSend.rows); 
    } 
    catch (err){
        console.error(err);
        res.status(500).send('Server error');
    }
});

//FULL: /api/test/database-connection
router.get('/database-connection', async (req, res) => {
    try{
        const data = await pool.query('select count(*) AS Working FROM staff');
        res.json(data.rows); 
        // data itself WILL Return {command: 'SELECT', rowCount: 2, oid: null, rows: Array(2), fields: Array(3), …} 
        //rows mean data, fields mean attributes
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


module.exports = router;