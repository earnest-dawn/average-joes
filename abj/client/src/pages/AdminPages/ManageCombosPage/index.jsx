import React, { useEffect, useState } from "react";

export default function ManageCombosPage() {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetch('/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ combos { id title price } }' }),
    })
      .then((r) => r.json())
      .then((data) => setCombos(data.data?.combos || []))
      .catch(console.error);
  }, []);

  return (
      <div style={{ padding: 20 }}>
        <h2>Combos</h2>
        {combos.length === 0 && <p>No combos found.</p>}
        <ul>
          {combos.map((c) => (
            <li key={c.id}>
              {c.title} - ${c.price}
            </li>
          ))}
        </ul>
      </div>
  );
}
