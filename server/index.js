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
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  database.all('SELECT * FROM productTable').then((productTable) => {
    res.send(productTable);
    console.log('Product table:', productTable);
  });
});

app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });

  database
    .get('SELECT * FROM userTable WHERE username = ? AND password = ?', [
      username,
      password,
    ])
    .then((user) => {
      if (user) {
        res.json({ success: true, user });
        console.log('Login successful for user:', user);
      } else {
        res
          .status(401)
          .json({ success: false, message: 'Invalid credentials' });
        console.log('Login failed for username:', username);
      }
    })
    .catch((error) => {
      console.error('Database error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    });
});

app.listen(8080, () =>
  console.log('Server running on port http://localhost:8080/'),
);
