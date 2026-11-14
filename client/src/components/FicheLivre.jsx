import { useEffect, useState } from "react";
import { nomAuteur, nomCategorie, obtenirLivre } from "../data/livres.js";

// Detail view of one book. It only receives the id and loads
// the book itself. onFermer() is provided by the parent.
export default function FicheLivre({ livreId, onFermer }) {
  const [resultat, setResultat] = useState(null); // { id, livre, erreur }

  // Effect: the book is requested every time livreId changes.
  useEffect(() => {
    obtenirLivre(livreId)
      .then((livre) => setResultat({ id: livreId, livre }))
      .catch((err) => setResultat({ id: livreId, erreur: err.message }));
  }, [livreId]);

  // Derived value: does the response match the requested book?
  const chargement = resultat?.id !== livreId;

  if (chargement) return <p>Chargement du livre…</p>;
  if (resultat.erreur) return <p className="erreur">{resultat.erreur}</p>;

  const { livre } = resultat;
  return (
    <div>
      <h3>{livre.title}</h3>
      <p>Auteur : {nomAuteur(livre.author_id)}</p>
      <p>Catégorie : {nomCategorie(livre.category_id)}</p>
      <p>Année de publication : {livre.publication_year}</p>
      <p>ISBN : {livre.isbn ?? "—"}</p>
      <p>
        État :{" "}
        {livre.available ? (
          <span className="succes">disponible</span>
        ) : (
          <span className="erreur">emprunté</span>
        )}
      </p>
      <button onClick={onFermer}>Fermer</button>
    </div>
  );
}
