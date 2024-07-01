import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth/auth.js";
import { connectDB } from "./config/db.js";

const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("./uploads"));

// Routes
app.use("/", authRoutes);

// Database
connectDB();

// Listner
const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
