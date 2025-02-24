const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.static("public")); // Serve static files (index.html)

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API to send JSON data
app.get("/api/data", (req, res) => {
    receivedJson = req.body; // Store JSON
    res.json(receivedJson);
});

// Receive PDF and send it back for download
app.post("/api/send-pdf", upload.single("pdf"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No PDF uploaded" });
    }

    // Send PDF back to client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.send(req.file.buffer);
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});