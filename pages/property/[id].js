import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Property() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:4000/api/listings/${id}`)
      .then(res => res.json())
      .then(data => setProperty(data));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{property.title}</h1>
      <p>£{property.price}</p>
      <p>{property.bedrooms} bedrooms</p>
      <p>{property.description}</p>
      {property.image && <img src={property.image} width="400" />}
    </div>
  );
}
