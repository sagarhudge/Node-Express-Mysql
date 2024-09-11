### ### Step 1: Install MySQL and MySQL Workbench
Download MySQL from the official website: MySQL Downloads.
After installation, add MySQL to your PATH in .zshrc (mac os)
```bash
export PATH=$PATH:/usr/local/mysql-9.0.1-macos14-x86_64/bin
```
Restart the terminal or source the file:(mac os)
```bash
source ~/.zshrc
```
Log into MySQL using:
```bash
mysql -u root -p
```
Create a new database:
```bash
CREATE DATABASE mynode;
SHOW DATABASES;
```
### Windows installation
On windows download the installer .msi and select mysql and work bench with arrow from server and application
Keep config. as default and use strong password and keep in note
- MySQL80 as service name rest keep it default
- Grant full permission
- Install MySQL Workbench to view and manage your database.

- Download and Install MySQL Workbench (mac os)
- Download MySQL Workbench from the official MySQL website: MySQL Workbench Downloads.
- Install MySQL Workbench by opening the downloaded .dmg file and dragging the MySQL Workbench icon into your Applications folder.
Launch MySQL Workbench

- Open MySQL Workbench from your Applications folder.
-Upon first launch, you might be prompted with a security warning; click "Open."

- Set Up a New Database Connection
- Click on the "+" sign next to "MySQL Connections" to create a new connection.
- Configure the Connection Settings:
- Connection Name: Give your connection a name (e.g., Local MySQL).
- Connection Method: Choose Standard (TCP/IP).
- Hostname: localhost (if running MySQL locally).
- Port: 3306 (default port for MySQL).
- Username: root (or the user you've set up).
- Password: Click "Store in Keychain" and enter your MySQL password

- Test Connection:
Click "Test Connection" to verify that the connection settings are correct.
If the connection is successful, you'll see a confirmation message. If not, double-check your hostname, port, username, and password.
- Click "OK" to save the connection.

- Connect to the Database
After saving the connection, you'll see it listed under MySQL Connections on the main screen.
Double-click the connection you just created (Local MySQL) to connect to your MySQL server

Now, you can perform
- Creating a Database and Tables from workbench
- Importing and Exporting Data
- Managing Users and Permissions
- Backing Up Your Database

Start the server:
```bash

node index.js
```
Open your browser/postman and visit http://localhost:3000/create to create the employee .

Now, View database and table to see the records in mysqlworkbench
