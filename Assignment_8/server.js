
require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Test the server
app.get("/", (req, res) => {
  res.json({ message: "Student CRUD API is running" });
});

// CREATE
app.post("/api/students", async (req, res) => {
  try {
    const { name, email, course, age } = req.body;

    const student = await Student.create({
      name,
      email,
      course,
      age,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This email already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("CREATE ERROR:", error);
    res.status(500).json({
      message: "Failed to create student",
    });
  }
});

// READ ALL
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("READ ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
});

// READ ONE
app.get("/api/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error("READ ONE ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch student",
    });
  }
});

// UPDATE
app.put("/api/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const allowedFields = ["name", "email", "course", "age"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide a field to update",
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This email already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      message: "Failed to update student",
    });
  }
});

// DELETE
app.delete("/api/students/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }

    const student = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      message: "Failed to delete student",
    });
  }
});

// Connect to MongoDB before starting the server
async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
