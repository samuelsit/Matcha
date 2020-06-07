var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root'
})

connection.connect();

connection.query('CREATE DATABASE IF NOT EXISTS matcha')
console.log('Database matcha created')
connection.query('USE matcha')
connection.query('CREATE TABLE IF NOT EXISTS members (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, pseudo VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, firstname VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, createdAt DATE, myGender VARCHAR(25), attiranceMale BOOLEAN DEFAULT TRUE, attiranceFemale BOOLEAN DEFAULT TRUE, biographie VARCHAR(10000), interet VARCHAR(255), birthday INT, birthmonth INT, birthyear INT, pic0 VARCHAR(255), pic1 VARCHAR(255), pic2 VARCHAR(255), pic3 VARCHAR(255), pic4 VARCHAR(255), city VARCHAR(255), lat FLOAT, lng FLOAT, lastVisite DATE, popularity INT, isLoggued BOOLEAN DEFAULT FALSE, isValid BOOLEAN DEFAULT TRUE, isNotif BOOLEAN DEFAULT FALSE, isMessage BOOLEAN DEFAULT TRUE, token VARCHAR(255))')
console.log('Table members created')
connection.query('CREATE TABLE IF NOT EXISTS interactions (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, interFrom VARCHAR(100) NOT NULL, interTo VARCHAR(100) NOT NULL, data VARCHAR(255) NOT NULL, createdAt DATE)')
console.log('Table interactions created')
connection.query('CREATE TABLE IF NOT EXISTS messages (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, messaFrom VARCHAR(100) NOT NULL, messaTo VARCHAR(100) NOT NULL, data VARCHAR(255) NOT NULL, createdAt DATE)')
console.log('Table messages created')
connection.end()