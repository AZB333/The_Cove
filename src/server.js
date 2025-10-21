import express from "express";
import dotenv from "dotenv";
import pkg from "pg";
import multer from "multer";
import path from "path"; //for __dirname
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const { Pool } = pkg;

// Multer setup
import fs from "fs";

const uploadDir = path.join(__dirname, "uploads");

// Create folder if missing
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

import session from "express-session";



// import bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs'); //  To hash passwords


const app = express();
app.use(express.json()); // allows JSON body parsing
// app.use(express.static("public")); // serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// // connect to PostgreSQL
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   ssl: { rejectUnauthorized: false } 
// });
   const pool = new Pool({
     host: process.env.DB_HOST,
     port: process.env.DB_PORT,
     database: process.env.DB_NAME,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
   });

//user credentials session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // set true if using HTTPS
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

//uploads
app.get("/uploads", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "uploads.html"));
});

//photos
app.get('/photos-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM photos ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading photos');
  }
});

app.get('/photos', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'photos.html'));
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
app.post('/submit-survey', async (req, res) => {
  const { rating, safe, music, ceiling, more, less, unsafe_reason } = req.body;
  const username = req.session.user ? req.session.user.username : "Anonymous";

  
  try {
    await pool.query(
      `INSERT INTO survey_responses (rating, safe, music, ceiling, more, less, unsafe_reason, username)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [rating, safe, music, ceiling, more, less, unsafe_reason || null, username]
    );

    res.status(200).json({ message: "Survey submitted successfully" });
  } catch (err) {
    console.error('Error saving survey:', err);
    res.status(500).send('Error submitting survey.');
  }
});


//uploads
app.post("/upload", upload.array("photos", 10), async (req, res) => {
  const username = req.session.user ? req.session.user.username : "Anonymous";

  try {
    const client = await pool.connect();

    for (const file of req.files) {
      const { filename, originalname, path: filepath } = file;

      await client.query(
        `INSERT INTO photos (username, filename, originalname, filepath)
         VALUES ($1, $2, $3, $4)`,
        [username, filename, originalname, filepath]
      );
    }

    client.release();
    res.redirect("/photos");


  } catch (err) {
    console.error("Error saving to DB:", err);
    res.status(500).send("Upload failed");
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
