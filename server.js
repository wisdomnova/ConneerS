const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();

app.use(cors({ 
    origin: '*', // Allow all origins
    methods: 'GET, POST', 
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

// Receive JSON from external site and pass it to index.html
let receivedJson = {};
app.post('/api/data', (req, res) => {
    receivedJson = req.body; // Store JSON
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the page
});

// Endpoint to send stored JSON to index.html
app.get('/api/getData', (req, res) => {
    res.json(receivedJson);
});

// Receive PDF from index.html and send it back as response
app.post('/api/upload-pdf', upload.single('pdf'), (req, res) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(req.file.buffer); // Send PDF back to external site
});

const PORT = process.env.PORT || 3000; // Use dynamic port for deployment
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
