// Catalog data: no file, no server, no network.
// Field names (title, available, category_id…) match the library_db database.

export const CATEGORIES = [
  { id: 1, name: "Science Fiction" },
  { id: 2, name: "Fantasy" },
  { id: 3, name: "Classic Literature" },
  { id: 4, name: "Mystery" },
  { id: 5, name: "Non-Fiction" },
];

export const AUTEURS = [
  { id: 1, first_name: "Isaac", last_name: "Asimov" },
  { id: 2, first_name: "Ursula", last_name: "Le Guin" },
  { id: 3, first_name: "Agatha", last_name: "Christie" },
  { id: 4, first_name: "George", last_name: "Orwell" },
  { id: 5, first_name: "Jane", last_name: "Austen" },
  { id: 6, first_name: "Yuval Noah", last_name: "Harari" },
];

const LIVRES_INITIAUX = [
  { id: 1, title: "Foundation", isbn: "9780553293357", publication_year: 1951, available: true, category_id: 1, author_id: 1 },
  { id: 2, title: "I, Robot", isbn: "9780553294385", publication_year: 1950, available: true, category_id: 1, author_id: 1 },
  { id: 3, title: "A Wizard of Earthsea", isbn: "9780547773742", publication_year: 1968, available: true, category_id: 2, author_id: 2 },
  { id: 4, title: "The Left Hand of Darkness", isbn: "9780441478125", publication_year: 1969, available: false, category_id: 1, author_id: 2 },
  { id: 5, title: "Murder on the Orient Express", isbn: "9780062693662", publication_year: 1934, available: true, category_id: 4, author_id: 3 },
  { id: 6, title: "And Then There Were None", isbn: "9780062073488", publication_year: 1939, available: true, category_id: 4, author_id: 3 },
  { id: 7, title: "1984", isbn: "9780451524935", publication_year: 1949, available: false, category_id: 1, author_id: 4 },
  { id: 8, title: "Animal Farm", isbn: "9780451526342", publication_year: 1945, available: true, category_id: 3, author_id: 4 },
  { id: 9, title: "Pride and Prejudice", isbn: "9780141439518", publication_year: 1813, available: true, category_id: 3, author_id: 5 },
  { id: 10, title: "Sense and Sensibility", isbn: "9780141439662", publication_year: 1811, available: true, category_id: 3, author_id: 5 },
  { id: 11, title: "Sapiens", isbn: "9780062316097", publication_year: 2011, available: true, category_id: 5, author_id: 6 },
  { id: 12, title: "Homo Deus", isbn: "9780062464316", publication_year: 2015, available: false, category_id: 5, author_id: 6 },
];

// Small display helpers: find a name from an id.
export function nomCategorie(id) {
  return CATEGORIES.find((c) => c.id === id)?.name ?? "—";
}

export function nomAuteur(id) {
  const a = AUTEURS.find((a) => a.id === id);
  return a ? `${a.first_name} ${a.last_name}` : "—";
}

// Pure function: returns a new list and does not modify the one it receives.
// categorieId is "" for "Toutes" (it comes from a <select>, so it is a string).
export function filtrerLivres(
  liste,
  { categorieId = "", disponibles = false } = {},
) {
  return liste.filter(
    (l) =>
      (categorieId === "" || l.category_id === Number(categorieId)) &&
      (!disponibles || l.available),
  );
}

// Simulated delay of a remote response, in milliseconds.
const DELAI_MS = 300;

function attendre() {
  return new Promise((resolve) => setTimeout(resolve, DELAI_MS));
}

// Books live in the page's memory: they reset when the page reloads.
let livres = LIVRES_INITIAUX.map((l) => ({ ...l }));

// Simulated "request": the promise resolves after DELAI_MS.
export async function listerLivres({ categorieId = "", disponibles = false } = {}) {
  await attendre();
  return filtrerLivres(livres, { categorieId, disponibles }).map((l) => ({
    ...l,
  }));
}

// Simulated "request": one book, found by its id.
export async function obtenirLivre(id) {
  await attendre();
  const livre = livres.find((l) => l.id === Number(id));
  if (!livre) throw new Error(`Livre ${id} introuvable.`);
  return { ...livre };
}

// Simulated add: the book joins the in-memory list and is returned with its id.
export async function ajouterLivre(corps) {
  await attendre();
  const id = livres.reduce((max, l) => Math.max(max, l.id), 0) + 1;
  const livre = {
    id,
    title: corps.title.trim(),
    isbn: null,
    publication_year: corps.publication_year,
    available: corps.available,
    category_id: corps.category_id,
    author_id: corps.author_id,
  };
  livres = [...livres, livre];
  return { ...livre };
}
