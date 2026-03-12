import React, { useEffect, useState } from "react";

export default function ManageRestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ restaurants { id name category } }' }),
    })
      .then((r) => r.json())
      .then((data) => setRestaurants(data.data?.restaurants || []))
      .catch(console.error);
  }, []);

  return (
      <div style={{ padding: 20 }}>
        <h2>Restaurants</h2>
        {restaurants.length === 0 && <p>No restaurants available.</p>}
        <ul>
          {restaurants.map((r) => (
            <li key={r.id}>
              {r.name} ({r.category})
            </li>
          ))}
        </ul>
      </div>
  );
}
