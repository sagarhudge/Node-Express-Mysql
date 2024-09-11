Step 1: Install MySQL and MySQL Workbench
Download MySQL from the official website: MySQL Downloads.
After installation, add MySQL to your PATH in .zshrc (mac os)

export PATH=$PATH:/usr/local/mysql-9.0.1-macos14-x86_64/bin
Restart the terminal or source the file:(mac os)

source ~/.zshrc
Log into MySQL using:

mysql -u root -p
Create a new database:

CREATE DATABASE mynode;
SHOW DATABASES;
Windows installation
On windows download the installer .msi and select mysql and work bench with arrow from server and application
Keep config. as default and use strong password and keep in note
MySQL80 as service name rest keep it default
Grant full permission
Install MySQL Workbench to view and manage your database.

Download and Install MySQL Workbench (mac os)
Download MySQL Workbench from the official MySQL website: MySQL Workbench Downloads.
Install MySQL Workbench by opening the downloaded .dmg file and dragging the MySQL Workbench icon into your Applications folder.
Launch MySQL Workbench

Open MySQL Workbench from your Applications folder.
-Upon first launch, you might be prompted with a security warning; click "Open."

Set Up a New Database Connection
Click on the "+" sign next to "MySQL Connections" to create a new connection.
Configure the Connection Settings:
Connection Name: Give your connection a name (e.g., Local MySQL).
Connection Method: Choose Standard (TCP/IP).
Hostname: localhost (if running MySQL locally).
Port: 3306 (default port for MySQL).
Username: root (or the user you've set up).
Password: Click "Store in Keychain" and enter your MySQL password

Test Connection:
Click "Test Connection" to verify that the connection settings are correct.
If the connection is successful, you'll see a confirmation message. If not, double-check your hostname, port, username, and password.
Click "OK" to save the connection.

Connect to the Database
After saving the connection, you'll see it listed under MySQL Connections on the main screen.
Double-click the connection you just created (Local MySQL) to connect to your MySQL server

Now, you can perform
Creating a Database and Tables from workbench
Importing and Exporting Data
Managing Users and Permissions
Backing Up Your Database

Step 2: Setup Node.js Project with Typescript
Install Node.js and npm on your machine.
Verify installations:

node -v
npm -v
Initialize a new project and install Express:

npm init -y
npm install mysql2
npm install express typescript ts-node @types/node @types/express --save-dev
Create and update tsconfig.json

npx tsc - init
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
Project Structure
/node-mysql-app

│
├── controllers
│ └── employee.ts
│
├── routes
│ └── employee.ts
│
├── database
│ └── db.ts
│ └── config.ts
|
├── helper
│ └── helper.ts
|
└── index.tsx
Step 3: Database Connection (src/database/db.ts)
import mysql from "mysql2/promise";
import config from "./config";
async function query(sql:string, params:any) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.query(sql, params);
  return results;
}
 
export default  {
  query,
};
Step 4: Define config (src/database/config.ts)
const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "admin",
        database: "nodemysql",
    },
    port: 3000,
    listPerPage: 100
};
export default config;
Step 5: Define Routes (src/routes/employee.js)
with all CRUD operation
import express, { NextFunction, Request, response, Response } from "express";
import employee from "../controller/employee";

const router = express.Router();
//create employee
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await employee.create(req.body));
    } catch (err) {
      next(err);
    }
  }
);
// get employee by id

router.get("/all", async (req: Request, res: Response, next) => {
  try {
    const emp = await employee.getAllEmployees(req);
    res.json(emp);
  } catch (err: any) {
    console.error(`Error while getting Records `, err.message);
    next(err);
  }
});

//update employee by id

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emp = await employee.update(req.params.id, req.body);
    res.json(emp);
  } catch (err: any) {
    console.error(`Error while getting Records `, err.message);
    next(err);
  }
});

// Delete employee by id
router.delete("/:id", async (req: Request, res: Response,next:NextFunction) => {
  try {
    const emp = await employee.remove(req.params.id);
    res.json(emp);
  } catch (err: any) {
    console.error(`Error while getting Records `, err.message);
    next(err);
  }
});

export default router;
Step 6: Create Controller (src/controllers/employee.ts)
import db from "../database/db";
import { emptyOrRows } from "../helper/helper";
import { IEmployee } from "../models/IEmployee";

async function getAllEmployees(req: any): Promise<IEmployee[]> {
  const rows = await db.query(`SELECT * FROM employee`);
  const data: IEmployee[] = emptyOrRows(rows);
  return data;
}
async function getEmployeeByID(req: any): Promise<IEmployee[]> {
  const rows = await db.query(
    `SELECT * FROM employee WHERE id=${req.params.id}`
  );
  const data: IEmployee[] = emptyOrRows(rows);
  return data;
}
async function create(payload: any): Promise<Object> {
  const data = {
    name: payload.name,
    email: payload.email,
  };
  const result: any = await db.query(`INSERT INTO employee SET ?`, data);
  let message = "Error in creating Record";
  if (result.affectedRows) {
    message = "Record created successfully";
  }
  return { message };
}
async function update(id: string, payload: any): Promise<Object> {
  const data = {
    name: payload.name,
    email: payload.email,
  };
  const result: any = await db.query(`UPDATE employee SET? WHERE id = ?`, [
    data,
    id,
  ]);
  let message = "Error in updating Record";
  if (result.affectedRows) {
    message = "Record updated successfully";
  }
  return { message };
}
async function remove(id: string): Promise<Object> {
  const result: any = await db.query(`DELETE FROM employee WHERE id=?`, [id]);
  let message = "Error in deleting Record";
  if (result.affectedRows) {
    message = "Record deleted successfully";
  }
  return { message };
}
export default {
  getAllEmployees,
  create,
  update,
  remove,
  getEmployeeByID,
};
Step 7: Main Server File (src/index.ts) and package.json
import express, { NextFunction, Request, Response } from "express";
const app = express();
import db from "./database/config";
import employee from "./routes/employee";
const port = db.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/employee", employee);
/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
Create Helper file at src/helper/helper.ts to check the empty rows form the database response.
export function emptyOrRows(rows: any) {
  if (!rows) {
    return [];
  }
  return rows;
}
Update the package.json

"main": "index.ts",
...  
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node src/index.ts",
    "build": "tsc",
    "serve": "node dist/index.js"
  },
Start the server:

node index.js
Open your browser/postman and visit http://localhost:3000/create to create the employee .

Now, View database and table to see the records in mysqlworkbench
Conclusion
We now have a functioning API server that uses Node.js and MySQL with TYpoescript. This tutorial taught us how to set up MySQL and MySQL Workbench as a free service. We then created an Express.js server that can handle various HTTP methods (GET, POST,PUT,DELETE) concerning how it translates to SQL queries.
Happy Coding ….!
Coming Soon : Advanced example using store procedures
