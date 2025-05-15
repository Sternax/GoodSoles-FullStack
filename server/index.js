const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const cors = require('cors');

let database;
(async () => {
  database = await sqlite.open({
    driver: sqlite3.Database,
    filename: './database.sqlite3',
  });

  await database.run('PRAGMA foreign_keys = ON;');
  console.log('Connected to the SQLite database.');
})();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  database.all('SELECT * FROM productTable').then((productTable) => {
    res.send(productTable);
    console.log('Product table:', productTable);
  });
});

app.listen(8080, () =>
  console.log('Server running on port http://localhost:8080/'),
);
