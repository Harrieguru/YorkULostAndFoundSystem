# HOW TO RUN YorkU Lost And Found System 
### Setting up your database
1. Open 'PostgreSQL/pgAdmin'
2. Right click the 'Databases' folder in the sidebar, hover over 'Create' then click 'Database'
3. In 'General', for the 'Database' field, Give the database a name and click 'Save'
4. Right click the database created in the sidebar and click 'Query Tool'
5. In the query tool, create a connection to the database by clicking the bar at the top of the subpage and clicking '<New Connection>'
6. Inside the 'Add New Connection' popup, the 'Server' field should be the default, the 'Database' field should be the one you created earlier and the 'User' is just your account username
    and the 'Role' field should be left empty
7. In the query tool, click the folder icon
8. Find the 'DatabaseSchema.sql' file using the file search, this file is located inside the project folder
9. Run the file using the play button
10. Find the 'DatabaseData.sql' file using the file search, this file is located inside the project folder
11. Repeat step 9


### Setting up project
1. cd into Frontend and run: npm install
    COMMANDS:
    cd .\YorkULostAndFoundSystem\
    cd .\Frontend\
    npm install
    
2. cd into Backend and run: npm install
    COMMANDS:
    cd .\YorkULostAndFoundSystem\
    cd .\Backend\
    npm install

4. Create or find the dbConfig.js file in the Backend Folder and place your personal database connection configuration data in there 
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
   
5. go to: http://localhost:5173

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



