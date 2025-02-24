const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files (index.html)
app.use(express.urlencoded({ extended: true }));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API to send JSON data
app.get("/api/data", (req, res) => {
    receivedJson = {
        "first_name": "John",
        "last_name": "Smith",
        "desired_job_title": "Java Developer",
        "email_address": "jwsmith@colostate.edu",
        "phone_number": "",
        "country": "USA",
        "state": "CO",
        "city": "Fort Collins",
        "postal_code": "80525",
        "employment_history": [
            {
                "job_title": "Counseling Supervisor",
                "company": "The Wesley Center",
                "start_date": "1999",
                "end_date": "2002",
                "location": "Little Rock, Arkansas",
                "description": "• Determined work placement for 150 special needs adult clients. • Maintained client databases and records. • Coordinated client contact with local health care professionals on a monthly basis. • Managed 25 volunteer workers.",
                "ai_suggested_description": ""
            },
            {
                "job_title": "Client Specialist",
                "company": "Rainbow Special Care Center",
                "start_date": "1997",
                "end_date": "1999",
                "location": "Little Rock, Arkansas",
                "description": "",
                "ai_suggested_description": ""
            },
            {
                "job_title": "Teacher’s Assistant",
                "company": "Cowell Elementary",
                "start_date": "1996",
                "end_date": "1997",
                "location": "Conway, Arkansas",
                "description": "",
                "ai_suggested_description": ""
            }
        ],
        "education": [
            {
                "institution": "University of Arkansas at Little Rock",
                "degree": "BS in Early Childhood Development",
                "start_date": "",
                "end_date": "1999",
                "location": "Little Rock, AR",
                "description": "• BA in Elementary Education (1998) • GPA (4.0 Scale): Early Childhood Development – 3.8, Elementary Education – 3.5, Overall 3.4. • Dean’s List, Chancellor’s List"
            }
        ],
        "courses": [],
        "skills": [
            {
                "skill": "Early Childhood Development"
            },
            {
                "skill": "Client Management"
            },
            {
                "skill": "Volunteer Coordination"
            },
            {
                "skill": "Database Management"
            },
            {
                "skill": "Communication"
            },
            {
                "skill": "Team Management"
            },
            {
                "skill": "Activity Planning"
            },
            {
                "skill": "Financial Assistance Research"
            },
            {
                "skill": "Classroom Management"
            }
        ],
        "work_portfolio": [],
        "links": [
            {
                "link_name": "LinkedIn",
                "url": "https://www.linkedin.com/in/thetrungvu/"
            },
            {
                "link_name": "YouTube",
                "url": "http://www.youtube.com/"
            },
            {
                "link_name": "Twitter",
                "url": "https://www.twitter.com/"
            },
            {
                "link_name": "Facebook",
                "url": "https://www.facebook.com/"
            },
            {
                "link_name": "GitHub",
                "url": "https://www.github.com/"
            },
            {
                "link_name": "Behance",
                "url": "https://www.behance.com/"
            }
        ],
        "relevant_suggested_skils": [
            {
                "skill": "Java"
            },
            {
                "skill": "Spring"
            },
            {
                "skill": "SQL"
            },
            {
                "skill": "Linux"
            },
            {
                "skill": "Redis"
            },
            {
                "skill": "KeyCloak"
            },
            {
                "skill": "API Development"
            },
            {
                "skill": "Object-Oriented Programming"
            },
            {
                "skill": "Problem-Solving"
            },
            {
                "skill": "Communication"
            }
        ],
        "professional_summary": "Four years experience in early childhood development with a diverse background in the care of special needs children and adults.",
        "professional_summary_suggestion": "Dedicated professional with extensive experience in early childhood development and special needs care, seeking to leverage skills in a challenging role as a Java Developer.",
        "ats_score": 34,
        "ats_comment": "The resume meets several criteria but lacks direct relevance to the programming role, particularly in technical skills.",
        "ats_score_suggestion": "Consider gaining experience in programming languages and frameworks relevant to the job description to improve ATS score.",
        "completion_percentage_in_percent": "75",
        "further_comment": "The resume showcases strong experience in early childhood development but does not align well with the technical requirements of a Java Developer role.",
        "ATS Scores": {
            "Contact Information": 8,
            "Summary Match": 0,
            "Education Match": 0,
            "Job Requirement vs Resume Work Experience Match": 0,
            "Like for Like Job Title Match": 0,
            "Job Hard Skills Match": 0,
            "Job Soft Skills Match": 6,
            "Total": 34
        }
    };
    res.json(receivedJson);
});

// Receive PDF and send it back for download
// app.post("/api/send-pdf", upload.single("pdf"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No PDF uploaded" });
//     }

//     // Send PDF back to client
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
//     res.send(req.file.buffer);
// });



// app.use(express.json()); // Middleware to parse JSON
// app.use(express.urlencoded({ extended: true })); // Optional: For URL-encoded data

app.post("/api/send-pdf", (req, res) => {
    console.log("Received JSON Data:", req.body); // ✅ Console log the received data

    res.json({ message: "PDF data received successfully", receivedData: req.body });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});