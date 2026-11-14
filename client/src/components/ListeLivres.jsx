import { nomAuteur, nomCategorie } from "../data/livres.js";

// Component: a function that receives props and returns JSX.
// onSelectionner(id) is provided by the parent: the list does not know
// what happens when a title is clicked.
export default function ListeLivres({ livres, onSelectionner }) {
  if (livres.length === 0) return <p>Aucun livre pour ces filtres.</p>;
  return (
    <ul>
      {livres.map((l) => (
        <li key={l.id}>
          <button className="lien" onClick={() => onSelectionner(l.id)}>
            {l.title}
          </button>{" "}
          — {nomAuteur(l.author_id)} — {nomCategorie(l.category_id)} —{" "}
          {l.available ? "disponible" : "emprunté"}
        </li>
      ))}
    </ul>
  );
}
