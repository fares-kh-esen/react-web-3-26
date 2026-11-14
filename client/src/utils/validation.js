// Pure function: receives the form values and returns the errors found.
export function valider(form) {
  const erreurs = {};
  if (form.title.trim() === "") {
    erreurs.title = "Le titre est obligatoire.";
  }
  const annee = Number(form.publication_year);
  if (form.publication_year === "" || !Number.isInteger(annee)) {
    erreurs.publication_year = "L'année de publication est obligatoire.";
  } else if (annee > new Date().getFullYear()) {
    erreurs.publication_year = "L'année ne peut pas être dans le futur.";
  }
  return erreurs;
}
