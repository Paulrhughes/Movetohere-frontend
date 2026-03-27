import { useEffect, useState } from "react";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/listings")
      .then(res => res.json())
      .then(data => setListings(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>MoveToHere – Property Listings</h1>
      <a href="/add">Add New Listing</a>

      {listings.map(l => (
        <div key={l.id} style={{ marginTop: 20 }}>
          <a href={`/property/${l.id}`}>
            <h2>{l.title}</h2>
          </a>
          <p>£{l.price}</p>
          <p>{l.bedrooms} bedrooms</p>
          {l.image && <img src={l.image} width="200" />}
        </div>
      ))}
    </div>
  );
}
