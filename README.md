# HOW TO RUN YorkU Lost And Found System 
### Setting up your database
1. Open PostgreSQL with 'pgAdmin'
2. Right-click Databases -> Create -> Database
3. Enter a database name (example: lost_and_found) inside the red field and click Save
4. Right-click the newly created database -> click Query Tool
5. Click the folder icon in the Query Tool
6. In the query tool, click the folder icon
7. Locate and open DatabaseSchema.sql (the file is inside the project folder)
8. Run the file using the play button
9. Repeat steps 5–7 for DatabaseData.sql



### Setting up project
1. cd into Frontend and run: npm install
    COMMANDS:
    cd .\YorkULostAndFoundSystem\
    cd .\Frontend\
    npm install
    
2. cd into Backend and run: npm install
    COMMANDS:
    cd ..
    cd .\Backend\
    npm install

3. Create or find the dbConfig.js file in the Backend Folder and place your personal database connection configuration data in there 
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
    COMMANDS:
    cd .\YorkULostAndFoundSystem\Backend\
    node server.js
    
3. in terminal two, cd into frontend and run: npm run dev
    COMMANDS:
    cd .\YorkULostAndFoundSystem\Frontend\
    npm run dev
   
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



