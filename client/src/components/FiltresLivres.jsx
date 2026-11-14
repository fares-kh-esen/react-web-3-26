import { CATEGORIES } from "../data/livres.js";

// Controlled component: it has no state of its own. It displays the values
// it receives and reports every change to the parent.
export default function FiltresLivres({
  categorieId,
  disponibles,
  onCategorieId,
  onDisponibles,
}) {
  return (
    <div>
      <label htmlFor="categorie">Catégorie </label>
      <select
        id="categorie"
        value={categorieId}
        onChange={(e) => onCategorieId(e.target.value)}
      >
        <option value="">Toutes</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <label style={{ marginLeft: 16 }}>
        <input
          type="checkbox"
          checked={disponibles}
          onChange={(e) => onDisponibles(e.target.checked)}
        />
        Disponibles seulement
      </label>
    </div>
  );
}
