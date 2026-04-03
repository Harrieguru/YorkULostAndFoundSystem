//Install Node packages
    //Node packages are not stored on git, redownload them through terminal
    //npm install must be run for both Frontend and Backend

//How to run
    //In terminal tab create two terminals
    //One should CD into Frontend
    //Other should CD into backend
        //Frontend terminal runs npm run dev
        //backend terminal runs node server.js

const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'nodeJS express backend is online.' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});