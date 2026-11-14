// Simulated member data (same fields as the members table).
const MEMBRES = [
  { id: 1, first_name: "Amine", last_name: "Trabelsi", email: "amine.trabelsi@example.com", registration_date: "2025-09-01" },
  { id: 2, first_name: "Sarra", last_name: "Ben Salah", email: "sarra.bensalah@example.com", registration_date: "2025-09-02" },
  { id: 3, first_name: "Youssef", last_name: "Gharbi", email: "youssef.gharbi@example.com", registration_date: "2025-09-05" },
  { id: 4, first_name: "Nour", last_name: "Jlassi", email: "nour.jlassi@example.com", registration_date: "2025-09-10" },
  { id: 5, first_name: "Karim", last_name: "Hammami", email: "karim.hammami@example.com", registration_date: "2025-09-12" },
];

const DELAI_MS = 300;

// Simulated "request": the promise resolves after DELAI_MS.
export async function listerMembres() {
  await new Promise((resolve) => setTimeout(resolve, DELAI_MS));
  return MEMBRES.map((m) => ({ ...m }));
}
