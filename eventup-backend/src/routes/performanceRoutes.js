import express from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Dohvati sve nastupe
router.get("/", async (req, res) => {
  try {
    const [performances] = await db.query(
      `SELECT
        Nastup.Sifra_nastupa,
        Nastup.Datum_nastupa,
        Nastup.Mjesto_nastupa,
        Izvodac.Sifra_izvodaca,
        Izvodac.Ime_izvodaca,
        Izvodac.Prezime_izvodaca,
        Izvodac.UmjetnickoIme_izvodaca
      FROM Nastup
      INNER JOIN Izvodac ON Nastup.Sifra_izvodaca = Izvodac.Sifra_izvodaca`
    );
    res.json(performances);
  } catch (err) {
    console.error("❌ Greška pri dohvaćanju nastupa:", err.message);
    res.status(500).json({ error: "Greška pri dohvaćanju nastupa", details: err.message });
  }
});

// ✅ Kreiraj novi nastup (samo organizatori)
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "organizer") {
    return res.status(403).json({ error: "Nemate ovlasti za dodavanje nastupa" });
  }

  const { Datum_nastupa, Mjesto_nastupa, Sifra_izvodaca } = req.body;

  console.log("📥 API zahtjev za dodavanje:", req.body); // ✅ Debugging

  try {
    const sql = "INSERT INTO Nastup (Datum_nastupa, Mjesto_nastupa, Sifra_izvodaca) VALUES (?, ?, ?)";
    const values = [Datum_nastupa, Mjesto_nastupa, Sifra_izvodaca];

    console.log("📌 SQL UPIT:", sql, values); // ✅ Debugging

    await db.query(sql, values);
    res.json({ message: "✅ Nastup uspješno dodan!" });
  } catch (err) {
    console.error("❌ Greška pri dodavanju nastupa:", err.message);
    res.status(500).json({ error: "Greška pri dodavanju nastupa", details: err.message });
  }
});

// ✅ Ažuriraj nastup (samo organizatori)
router.put("/:Sifra_nastupa", authMiddleware, async (req, res) => {
  if (req.user.role !== "organizer") {
    return res.status(403).json({ error: "Nemate ovlasti za uređivanje nastupa" });
  }

  const { Datum_nastupa, Mjesto_nastupa, Sifra_izvodaca } = req.body;
  const { Sifra_nastupa } = req.params;

  console.log("📥 API zahtjev za ažuriranje:", req.body, "ID:", Sifra_nastupa); // ✅ Debugging

  try {
    const sql = "UPDATE Nastup SET Datum_nastupa = ?, Mjesto_nastupa = ?, Sifra_izvodaca = ? WHERE Sifra_nastupa = ?";
    const values = [Datum_nastupa, Mjesto_nastupa, Sifra_izvodaca, Sifra_nastupa];

    console.log("📌 SQL UPIT:", sql, values); // ✅ Debugging

    await db.query(sql, values);
    res.json({ message: "✅ Nastup uspješno ažuriran!" });
  } catch (err) {
    console.error("❌ Greška pri ažuriranju nastupa:", err.message);
    res.status(500).json({ error: "Greška pri ažuriranju nastupa", details: err.message });
  }
});

// ✅ Obriši nastup (samo organizatori)
router.delete("/:Sifra_nastupa", authMiddleware, async (req, res) => {
  if (req.user.role !== "organizer") {
    return res.status(403).json({ error: "Nemate ovlasti za brisanje nastupa" });
  }

  const { Sifra_nastupa } = req.params;

  console.log("🗑️ Brisanje nastupa ID:", Sifra_nastupa); // ✅ Debugging

  try {
    const sql = "DELETE FROM Nastup WHERE Sifra_nastupa = ?";
    const values = [Sifra_nastupa];

    console.log("📌 SQL UPIT:", sql, values); // ✅ Debugging

    await db.query(sql, values);
    res.json({ message: "✅ Nastup uspješno obrisan!" });
  } catch (err) {
    console.error("❌ Greška pri brisanju nastupa:", err.message);
    res.status(500).json({ error: "Greška pri brisanju nastupa", details: err.message });
  }
});

export default router;
