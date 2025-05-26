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
    // console.log('Product table:', productTable);
  });
});

app.post(
  '/profile',
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const { id, firstname, lastname, dateofbirth } = req.body;
    console.log('Received profile data:', req.body);

    if (!id || !firstname || !lastname || !dateofbirth) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    try {
      const existingProfile = await database.get(
        'SELECT * FROM userProfile WHERE id =?',
        [id],
      );
      if (existingProfile) {
        await database.run(
          'UPDATE userProfile SET firstname = ?, lastname = ?, dateofbirth = ? WHERE id = ?',
          [firstname, lastname, dateofbirth, id],
        );
      } else {
        await database.run(
          'INSERT INTO userProfile (id, firstname, lastname, dateofbirth) VALUES (?, ?, ?, ?)',
          [id, firstname, lastname, dateofbirth],
        );
      }
      console.log('Profile updated or created successfully for user ID:', id);
      res.json({
        success: true,
        message: 'Profile updated or created successfully',
      });
    } catch (error) {
      console.error('Error updating or creating profile:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
);

app.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await database.get(
      'SELECT firstname, lastname, dateofbirth FROM userProfile WHERE id = ?',
      [id],
    );
    if (data) {
      res.json({ success: true, data });
    } else {
      res.json({ success: true, data: {} });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

app.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await database.get(
      'SELECT * FROM userAccounts WHERE username = ? AND password = ?',
      [username, password],
    );

    if (user) {
      console.log(`Login successful for user: ${username} (ID: ${user.id})`);
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

app.post(
  '/register',
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    try {
      const existingUser = await database.get(
        'SELECT * FROM userAccounts WHERE username = ?',
        [username],
      );
      console.log('existingUser:', existingUser);

      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'Username already exists' });
      }

      await database.run(
        'INSERT INTO userAccounts (username, password) VALUES (?, ?)',
        [username, password],
      );

      console.log('User registered successfully:', username);
      res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Database error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

app.listen(8080, () =>
  console.log('Server running on port http://localhost:8080/'),
);
