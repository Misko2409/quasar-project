export const updatePerformance = async (req, res) => {
  const { id } = req.params;  // Provjeri da li backend koristi id ili Sifra_nastupa
  const { Datum_nastupa, Mjesto_nastupa, Sifra_izvodaca } = req.body;

  try {
      await db.query(
          "UPDATE Nastup SET Datum_nastupa = ?, Mjesto_nastupa = ?, Sifra_izvodaca = ? WHERE Sifra_nastupa = ?",
          [Datum_nastupa, Mjesto_nastupa, Sifra_izvodaca, id]
      );
      res.json({ message: "Nastup ažuriran!" });
  } catch (error) {
      res.status(500).json({ error: "Greška pri ažuriranju nastupa" });
  }
};
