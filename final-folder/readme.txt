# How to run this project

**1. Install Nodejs**

This project requires install [Node.js](https://nodejs.org/) and npm first. If you already have Nodejs and npm installed, skip this step.

Install NodeJS through this link:
```sh
https://nodejs.org/en/download/
```

**2. Configure database and run sql script**

- Fistly, inside the submitted folder, find the file ```Script-Database.sql```.
- Secondly, create new database on your computer by running that script.
- Finally, 

In the folder ```utils```, find ```db.js``` and fix it with the information of the database you have just created!
```
File: db.js
    host: '127.0.0.1',
    port: 3306, // Your any port you like
    user: 'root', // Your database admin name
    password: '', // Your database  password
    database: 'gearant' // Your database name
```

**3. Run the project**

- Use these commands to run the project:
```
npm i
```
```sh
npm install
```
```
node app.js
```
- Or, configure file app.js to be run in your IDE (Intellij). **File to run: ```app.js```**

**4. Test login/register**

- Test login by using the account below
```sh
  username: thanhhoang
  password: 123
```

- Test login as admin by using the account below
```sh
  username: admin1
  password: 123
```

- Test signup by using the account below
```sh
  username: thanh123,
  password: //anything
```


# Contributors

gearANT
- [Hoang Nhu Thanh](https://github.com/thanhhoang4869)
- [Doan Huong Ngan](https://github.com/19127049)
- [Nguyen Minh An](https://github.com/harris1111)

You are free to refer from our project, but ***do not copy without permission***.

