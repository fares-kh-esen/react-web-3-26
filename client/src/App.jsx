import { useEffect, useState } from "react";
import FiltresLivres from "./components/FiltresLivres.jsx";
import ListeLivres from "./components/ListeLivres.jsx";
import FicheLivre from "./components/FicheLivre.jsx";
import FormulaireLivre from "./components/FormulaireLivre.jsx";
import ListeMembres from "./components/ListeMembres.jsx";
import ListeEmprunts from "./components/ListeEmprunts.jsx";
import { ajouterLivre, listerLivres } from "./data/livres.js";
import { listerMembres } from "./data/membres.js";
import { listerEmprunts } from "./data/emprunts.js";

function cleDe(categorieId, disponibles, rafraichir) {
  return `${categorieId}|${disponibles}|${rafraichir}`;
}

export default function App() {
  // --- Catalog ---
  const [categorieId, setCategorieId] = useState(""); // "" = all categories
  const [disponibles, setDisponibles] = useState(false);
  const [rafraichir, setRafraichir] = useState(0); // counter: incremented after each add
  const [resultat, setResultat] = useState(null); // { cle, donnees }
  const [livreSelectionne, setLivreSelectionne] = useState(null); // id of the displayed book, or null

  // --- Members and loans ---
  const [membres, setMembres] = useState(null); // null = not loaded yet
  const [emprunts, setEmprunts] = useState(null);

  // A filter change OR an add reloads the list.
  useEffect(() => {
    const cle = cleDe(categorieId, disponibles, rafraichir);
    listerLivres({ categorieId, disponibles }).then((donnees) =>
      setResultat({ cle, donnees }),
    );
  }, [categorieId, disponibles, rafraichir]);

  // Empty dependency array: these effects only run on the first render.
  useEffect(() => {
    listerMembres().then(setMembres);
  }, []);

  useEffect(() => {
    listerEmprunts().then(setEmprunts);
  }, []);

  const enCours = resultat?.cle !== cleDe(categorieId, disponibles, rafraichir);
  const livres = resultat?.donnees ?? [];

  async function handleAjouter(livre) {
    await ajouterLivre(livre);
    setRafraichir((n) => n + 1); // the list updates thanks to the effect
  }

  return (
    <main>
      <h1>Bibliothèque</h1>

      <section>
        <h2>Filtres</h2>
        <FiltresLivres
          categorieId={categorieId}
          disponibles={disponibles}
          onCategorieId={setCategorieId}
          onDisponibles={setDisponibles}
        />
      </section>

      <section>
        <h2>Catalogue</h2>
        {enCours && <p>Mise à jour de la liste…</p>}
        <p>{livres.length} livre(s) trouvé(s).</p>
        <ListeLivres livres={livres} onSelectionner={setLivreSelectionne} />
      </section>

      {livreSelectionne !== null && (
        <section className="fiche">
          <h2>Fiche du livre</h2>
          <FicheLivre
            livreId={livreSelectionne}
            onFermer={() => setLivreSelectionne(null)}
          />
        </section>
      )}

      <section>
        <h2>Ajouter un livre</h2>
        <FormulaireLivre onAjouter={handleAjouter} />
      </section>

      <section>
        <h2>Membres</h2>
        {membres === null ? (
          <p>Chargement des membres…</p>
        ) : (
          <ListeMembres membres={membres} />
        )}
      </section>

      <section>
        <h2>Emprunts</h2>
        {emprunts === null ? (
          <p>Chargement des emprunts…</p>
        ) : (
          <ListeEmprunts emprunts={emprunts} />
        )}
      </section>
    </main>
  );
}
