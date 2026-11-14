// Display component: receives the loans and returns a table.
export default function ListeEmprunts({ emprunts }) {
  if (emprunts.length === 0) return <p>Aucun emprunt.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Livre</th>
          <th>Membre</th>
          <th>Emprunté le</th>
          <th>Rendu le</th>
        </tr>
      </thead>
      <tbody>
        {emprunts.map((e) => (
          <tr key={e.id}>
            <td>{e.book_title}</td>
            <td>{e.member_name}</td>
            <td>{e.loan_date}</td>
            <td>{e.return_date ?? "en cours"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
