import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: /^http:\/\/localhost:\d+$/,  // ← يقبل أي localhost
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});






