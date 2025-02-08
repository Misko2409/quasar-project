import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Dohvati sve izvođače
router.get("/", async (req, res) => {
  try {
    const [performers] = await db.query(
      "SELECT Sifra_izvodaca AS id, Ime_izvodaca AS name, Prezime_izvodaca AS surname, UmjetnickoIme_izvodaca AS stageName, Kontakt_izvodaca AS contact FROM Izvodac"
    );

    console.log("📥 Dohvaćeni izvođači:", performers);
    res.json(performers);
  } catch (err) {
    console.error("❌ Greška pri dohvaćanju izvođača:", err);
    res.status(500).json({ error: "Greška pri dohvaćanju izvođača", details: err.message });
  }
});

// ✅ Dodaj novog izvođača (samo organizatori)
router.post("/", authMiddleware, async (req, res) => {
  if (!req.user || req.user.role !== "organizer") {
    return res.status(403).json({ error: "Nemate ovlasti za dodavanje izvođača" });
  }

  console.log("📥 Podaci primljeni od frontenda:", req.body);

  const { name, surname, stageName, contact } = req.body;

  if (!name || !surname || !stageName || !contact) {
    return res.status(400).json({ error: "Sva polja su obavezna!" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO Izvodac (Ime_izvodaca, Prezime_izvodaca, UmjetnickoIme_izvodaca, Kontakt_izvodaca) VALUES (?, ?, ?, ?)",
      [name, surname, stageName, contact]
    );

    console.log("✅ Izvođač uspješno dodan. ID:", result.insertId);
    res.json({ message: "Izvođač uspješno dodan!", id: result.insertId });
  } catch (err) {
    console.error("❌ Greška pri dodavanju izvođača:", err);
    res.status(500).json({ error: "Greška pri dodavanju izvođača", details: err.message });
  }
});

// ✅ Ažuriraj izvođača (samo organizatori)
router.put("/:id", authMiddleware, async (req, res) => {
  if (!req.user || req.user.role !== "organizer") {
    return res.status(403).json({ error: "Nemate ovlasti za uređivanje izvođača" });
  }

  const { name, surname, stageName, contact } = req.body;
  const { id } = req.params;

  if (!name || !surname || !stageName || !contact) {
    return res.status(400).json({ error: "Sva polja su obavezna!" });
  }

  try {
    const [result] = await db.query(
      "UPDATE Izvodac SET Ime_izvodaca = ?, Prezime_izvodaca = ?, UmjetnickoIme_izvodaca = ?, Kontakt_izvodaca = ? WHERE Sifra_izvodaca = ?",
      [name, surname, stageName, contact, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Izvođač nije pronađen." });
    }

    console.log("✅ Izvođač uspješno ažuriran. ID:", id);
    res.json({ message: "Izvođač uspješno ažuriran!" });
  } catch (err) {
    console.error("❌ Greška pri ažuriranju izvođača:", err);
    res.status(500).json({ error: "Greška pri ažuriranju izvođača", details: err.message });
  }
});

// ✅ Obriši izvođača (samo organizatori)
router.delete("/:id", authMiddleware, async (req, res) => {
  if (!req.user || req.user.role !== "organizer") {
    return res.status(403).json({ error: "Nemate ovlasti za brisanje izvođača" });
  }

  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM Izvodac WHERE Sifra_izvodaca = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Izvođač nije pronađen." });
    }

    console.log("✅ Izvođač uspješno obrisan. ID:", id);
    res.json({ message: "Izvođač uspješno obrisan!" });
  } catch (err) {
    console.error("❌ Greška pri brisanju izvođača:", err);
    res.status(500).json({ error: "Greška pri brisanju izvođača", details: err.message });
  }
});

export default router;
