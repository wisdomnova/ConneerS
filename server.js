const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// ✅ Allow requests from multiple domains
const allowedOrigins = ['https://app.conneer.com', 'https://editor.weweb.io'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    methods: 'GET, POST, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve index.html

const storage = multer.memoryStorage(); // Store PDF in memory
const upload = multer({ storage: storage });

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle Preflight Requests (IMPORTANT for CORS)
app.options('*', cors());

// Receive JSON from external site and pass it to index.html
let receivedJson = {};
app.post('/api/data', (req, res) => {
    receivedJson = req.body;
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to send stored JSON to index.html
app.get('/api/getData', (req, res) => {
    res.json(receivedJson);
});

// Receive PDF from index.html and send it back as response
app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(req.file.buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
