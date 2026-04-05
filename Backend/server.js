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

console.log("server file loaded");

const pool = require("./dbHandler.js");
const path = require("path");
const bcrypt = require("bcrypt");
const express = require("express");
const testingRoutes = require("./testRoutes.js");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); //vite default port

app.get("/", (req, res) => {
  res.send("server is alive");
});

//debugging tool
//USE POSTMAN to test API calls
//use: http://localhost:3000[insert API] ie. http://localhost:3000/api/test/server-is-online
app.use("/api/test", testingRoutes);

app.get("/api/production/all-lost-items", async (req, res) => {
  try {
    const data = await pool.query(`
            SELECT *
            FROM lost_items    
        `);

    res.json(data.rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/production/all-item-claims", async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/production/all-item-reports", async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).send(err);
  }
});

//login route
app.post("/api/production/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await pool.query(
      `SELECT py.*, p.person_id, s.staff_id, bu.user_id
             FROM passport_york py
             JOIN person p ON p.cred_id = py.cred_id
             LEFT JOIN staff s ON s.person_id = p.person_id
             LEFT JOIN basic_user bu ON bu.person_id = p.person_id
             WHERE py.university_username = $1`,
      [username],
    );
    if (data.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = data.rows[0];
    const valid = await bcrypt.compare(password, user.university_pass_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const role = user.staff_id ? "staff" : "user";
    res.json({ username, role, userId: user.user_id || user.staff_id });
  } catch (err) {
    res.status(500).send(err);
  }
});

//report submission handler
app.post("/api/production/submit-report", async (req, res) => {
  const {
    item_category,
    item_type,
    brand,
    material,
    primary_colour,
    description,
    date_lost,
    location_lost,
    user_id,
  } = req.body;
  try {
    await pool.query(
      `INSERT INTO lost_item_report 
        (item_category, item_type, brand, material, primary_colour, description, date_lost, location_lost, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        item_category,
        item_type,
        brand,
        material,
        primary_colour,
        description,
        date_lost,
        location_lost,
        user_id,
      ],
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
//staff endpoint to add a lost item
app.post("/api/production/add-found-item", async (req, res) => {
  const {
    item_category,
    item_type,
    brand,
    material,
    primary_colour,
    description,
    date_found,
    location_found,
  } = req.body;
  try {
    const user = await pool.query(
      `SELECT staff_id FROM staff 
       JOIN person ON staff.person_id = person.person_id
       JOIN passport_york ON person.cred_id = passport_york.cred_id
       WHERE passport_york.university_username = $1`,
      [req.body.username],
    );
    const staff_id = user.rows[0]?.staff_id;
    if (!staff_id) return res.status(403).json({ error: "Not a staff member" });

    await pool.query(
      `INSERT INTO lost_items 
        (item_category, item_type, brand, material, primary_colour, description, date_found, location_found, staff_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        item_category,
        item_type,
        brand,
        material,
        primary_colour,
        description,
        date_found,
        location_found,
        staff_id,
      ],
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

//report resolved
app.patch("/api/production/resolve-report", async (req, res) => {
  const { first_name, last_name, item_type } = req.body;
  try {
    await pool.query(
      `UPDATE lost_item_report 
       SET report_status = 'resolved'
       WHERE item_type = $1
       AND user_id = (
         SELECT bu.user_id FROM basic_user bu
         JOIN person p ON p.person_id = bu.person_id
         WHERE p.first_name = $2 AND p.last_name = $3
       )`,
      [item_type, first_name, last_name],
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
});

const server = app.listen(3000, () => {
  console.log("Server running on port 3000. run the frontend dev view");

  //server wasnt working because another process was runnin in the back while hidden on port 3000
  //THE FIX: npx kill-port 3000
});
