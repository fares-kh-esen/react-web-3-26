// Simulated loan data (same fields as the loans table).
// return_date is null until the book is returned.
// member_name and book_title save us from looking up the member's name and the book's title.
const EMPRUNTS = [
  { id: 1, member_id: 1, book_id: 4, loan_date: "2025-09-15", return_date: null, member_name: "Amine Trabelsi", book_title: "The Left Hand of Darkness" },
  { id: 2, member_id: 2, book_id: 7, loan_date: "2025-09-16", return_date: null, member_name: "Sarra Ben Salah", book_title: "1984" },
  { id: 3, member_id: 3, book_id: 12, loan_date: "2025-09-18", return_date: null, member_name: "Youssef Gharbi", book_title: "Homo Deus" },
  { id: 4, member_id: 4, book_id: 1, loan_date: "2025-09-10", return_date: "2025-09-20", member_name: "Nour Jlassi", book_title: "Foundation" },
  { id: 5, member_id: 5, book_id: 9, loan_date: "2025-09-11", return_date: "2025-09-19", member_name: "Karim Hammami", book_title: "Pride and Prejudice" },
];

const DELAI_MS = 300;

// Simulated "request": the promise resolves after DELAI_MS.
export async function listerEmprunts() {
  await new Promise((resolve) => setTimeout(resolve, DELAI_MS));
  return EMPRUNTS.map((e) => ({ ...e }));
}
