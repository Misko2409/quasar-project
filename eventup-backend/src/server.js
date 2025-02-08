import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import performerRoutes from "./routes/performerRoutes.js";
import db from "./config/db.js";
import performanceRoutes from "./routes/performanceRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rute API-ja
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/performers", performerRoutes);
app.use("/api/performances", performanceRoutes);

// Health check ruta
app.get("/api/health", async (req, res) => {
  try {
    await db.getConnection(); // Provjera da li je MySQL konekcija aktivna
    res.json({ message: "✅ Server i MySQL su aktivni!" });
  } catch (error) {
    res.status(500).json({ error: "❌ MySQL nije dostupan!" });
  }
});

// ✅ Pokretanje servera
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await db.getConnection();
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Connected to MySQL Database`);
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  }
});
