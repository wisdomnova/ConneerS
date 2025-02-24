const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// 🔥 Allow All Origins (For Testing Only)
app.use(cors()); // This automatically sets 'Access-Control-Allow-Origin: *'

// Manually set CORS headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allow these methods
    res.header('Access-Control-Allow-Headers', '*');  // Allow all headers
    next();
});

// Handle Preflight Requests
app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.memoryStorage(); // Store PDF in memory
const upload = multer({ storage: storage });

// Handle PDF upload and return as a blob
app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(req.file.buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
