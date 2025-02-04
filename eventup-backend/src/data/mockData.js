export const users = [
  { id: 1, name: "Marko Mišković", email: "marko@test.com", password: "hashedpassword", role: "organizer" },
  { id: 2, name: "Ivana Perić", email: "ivana@test.com", password: "hashedpassword", role: "performer" }
];

export const events = [
  { id: 1, name: "Rock Night", location: "Zagreb", date: "2025-05-20", organizer_id: 1 },
  { id: 2, name: "Techno Festival", location: "Split", date: "2025-06-10", organizer_id: 1 }
];

export const performers = [
  { id: 1, name: "Parni Valjak", genre: "Rock", contact: "info@parnivaljak.com" },
  { id: 2, name: "Urban & 4", genre: "Alternative", contact: "urban@music.com" }
];
