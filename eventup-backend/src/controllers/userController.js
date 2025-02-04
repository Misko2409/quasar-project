import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  const { name, password } = req.body;
  const userId = req.user.id; // JWT Middleware mora postaviti req.user.id

  if (!name && !password) {
    return res.status(400).json({ error: "Morate unijeti novo ime ili lozinku" });
  }

  try {
    let query = "UPDATE users SET ";
    const values = [];

    if (name) {
      query += "name = ?, ";
      values.push(name);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += "password = ?, ";
      values.push(hashedPassword);
    }

    query = query.slice(0, -2); // Uklanjamo zadnji zarez
    query += " WHERE id = ?";
    values.push(userId);

    await db.execute(query, values);
    res.json({ message: "Profil uspješno ažuriran" });
  } catch (error) {
    console.error("Greška kod ažuriranja korisnika:", error);
    res.status(500).json({ error: "Nešto je pošlo po zlu" });
  }
};
