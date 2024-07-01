import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

const app = express();

// Routes

// Database

// Listner
const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
