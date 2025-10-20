import express from "express";
import dotenv from "dotenv";
import pkg from "pg";



import path from "path"; //for __dirname
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const { Pool } = pkg;


import session from "express-session";



// import bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs'); //  To hash passwords


const app = express();
app.use(express.json()); // allows JSON body parsing
// app.use(express.static("public")); // serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

//user credentials session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true if using HTTPS
      httpOnly: true, // helps prevent XSS
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);


app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


////////////gets/////////////

//landing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//calendar
  app.get("/calendar", requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "calendar.html"));
  });

//about
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

//login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

//create account
app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "create.html"));
});

//survey
app.get("/survey", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "survey.html"));
});

// test the connection
app.get("/testdb", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});



//authentication
app.get('/auth/status', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});




////////////posts/////////////
app.post("/create", async (req, res) => {
  const { name, email, birthday, username, password } = req.body;
  try {
    const existing = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (existing.rows.length > 0) {
      return res.status(400).send("Username already exists");
    }

    // Hash the password (never store raw passwords!)
    // const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, birthday, username, password_hash) VALUES ($1, $2, $3, $4, $5)",
      [name, email, birthday, username, password]
    );

    res.status(201).send("Account created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating account");
  }
});

//logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ success: false });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});



//login//
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).send('Invalid username or password.');
    }

    // If not using bcrypt yet, compare directly (only for testing)
    if (password !== user.password_hash) {
      return res.status(401).send('Invalid username or password.');
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    // Redirect to home after successful login
    res.status(200).json({ message: 'Login successful', redirect: '/' });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});


//survey//
app.post("/survey", async (req, res) => {
  const { rating, safe, music, ceiling, more, less } = req.body;

  try {
    await pool.query(
      "INSERT INTO survey_responses (rating, safe, music, ceiling, more, less) VALUES ($1, $2, $3, $4, $5, $6)",
      [rating, safe, music, ceiling, more, less]
    );

    res.status(201).json({ message: "Survey submitted successfully" });
  } catch (err) {
    console.error("Error saving survey:", err);
    res.status(500).json({ message: "Error saving survey" });
  }
});



// example route: add user
app.post("/users", async (req, res) => {
  const { username, email } = req.body;
  try {
    await pool.query("INSERT INTO users (username, email) VALUES ($1, $2)", [username, email]);
    res.status(201).send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
