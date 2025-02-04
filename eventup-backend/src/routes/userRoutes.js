import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// Dohvati korisničke podatke
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [user] = await db.query("SELECT id, name, email, role FROM users WHERE id = ?", [req.user.id]);

    if (!user.length) {
      return res.status(404).json({ error: "Korisnik nije pronađen" });
    }

    res.json(user[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvaćanju podataka" });
  }
});

// Ažuriraj korisnički profil
router.put("/", authMiddleware, async (req, res) => {
  const { name, password } = req.body;

  if (!name && !password) {
    return res.status(400).json({ error: "Nema podataka za ažuriranje" });
  }

  try {
    if (name) {
      await db.query("UPDATE users SET name = ? WHERE id = ?", [name, req.user.id]);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.user.id]);
    }

    res.json({ message: "Profil uspješno ažuriran" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri ažuriranju profila" });
  }
});

export default router;
