import { useState } from "react";
import { valider } from "../utils/validation.js";
import { AUTEURS, CATEGORIES } from "../data/livres.js";

// <select> and <input> values are strings: ids are converted
// to numbers when the form is submitted.
const VIDE = {
  title: "",
  author_id: String(AUTEURS[0].id),
  category_id: String(CATEGORIES[0].id),
  publication_year: "",
  available: true,
};

// Controlled form: every field is bound to the form state.
// onAjouter(livre) is provided by the parent; it returns a promise.
export default function FormulaireLivre({ onAjouter }) {
  const [form, setForm] = useState(VIDE);
  const [erreurs, setErreurs] = useState({});
  const [erreurAjout, setErreurAjout] = useState("");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);

  // One handler for every field. A checkbox is read with "checked".
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nouvellesErreurs = valider(form);
    setErreurs(nouvellesErreurs);
    setMessage("");
    setErreurAjout("");
    if (Object.keys(nouvellesErreurs).length > 0) return;
    setEnvoi(true);
    try {
      await onAjouter({
        title: form.title.trim(),
        author_id: Number(form.author_id),
        category_id: Number(form.category_id),
        publication_year: Number(form.publication_year),
        available: form.available,
      });
      setForm(VIDE);
      setMessage("Livre ajouté.");
    } catch (err) {
      setErreurAjout(err.message); // the input is kept so it can be corrected
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        {erreurs.title && <p className="erreur">{erreurs.title}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="author_id">Auteur</label>
        <select
          id="author_id"
          name="author_id"
          value={form.author_id}
          onChange={handleChange}
        >
          {AUTEURS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.first_name} {a.last_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category_id">Catégorie</label>
        <select
          id="category_id"
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="publication_year">Année de publication</label>
        <input
          id="publication_year"
          name="publication_year"
          type="number"
          step="1"
          value={form.publication_year}
          onChange={handleChange}
        />
        {erreurs.publication_year && (
          <p className="erreur">{erreurs.publication_year}</p>
        )}
      </div>
      <div className="form-group">
        <label>
          <input
            name="available"
            type="checkbox"
            checked={form.available}
            onChange={handleChange}
          />{" "}
          Disponible
        </label>
      </div>
      <button type="submit" disabled={envoi}>
        {envoi ? "Envoi…" : "Ajouter le livre"}
      </button>
      {erreurAjout && <p className="erreur">Échec de l'ajout : {erreurAjout}</p>}
      {message && <p className="succes">{message}</p>}
    </form>
  );
}
