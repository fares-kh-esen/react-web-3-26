// Display component: receives the members and returns a table.
export default function ListeMembres({ membres }) {
  if (membres.length === 0) return <p>Aucun membre.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Courriel</th>
          <th>Inscription</th>
        </tr>
      </thead>
      <tbody>
        {membres.map((m) => (
          <tr key={m.id}>
            <td>
              {m.first_name} {m.last_name}
            </td>
            <td>{m.email}</td>
            <td>{m.registration_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
