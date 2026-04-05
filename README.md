# HOW TO RUN YorkU Lost And Found System 
### Setting up your database
1. First run the DatabaseSchema.sql file in PostgreSQL
2. Then run the DatabaseData.sql file in postgreSQL

### Setting up project
1. cd into Frontend and run: npm install
2. cd into Backend and run: npm install
3. Create or find the dbConfig.js file in the backend and place your personal database connection configuration data in there 

    dbConfig.js file should look like this:

    const userName = [Your Postgre Username];
    const hostType = 'localhost';
    const databaseName = [The Database Name];
    const databasePass = [Password for Postgre Account];
    const port = 5432;

    module.exports = {
        userName,
        hostType,
        databaseName,
        databasePass,
        port
    }


### Running project Locally
1. Create two terminal instances in VSCODE
2. in terminal one, cd into backend and run: node server.js
3. in terminal two, cd into frontend and run: npm run dev
4. go to: http://localhost:5173

### How to log in
1. There are 3 accounts. 1 admin/staff acount and 2 user accounts
   a. Admin Account     -->     Username: admin, Password: admin
   b. User Account 1    -->     Username: student, Password: student
   c. User Account 2    -->     Username: itemHorder, Password: itemHorder

### Tech Stack
1. Frontend: Vite/React + TailwindCSS
2. Backend: Node.js + Express
3. Database: PostgreSQL

### Developer Tools
1. VS Code  
2. Postman
3. Figma  



