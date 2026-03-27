import { useState } from "react";

export default function Add() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    bedrooms: "",
    description: "",
    image: ""
  });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);

    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: data
    });

    const json = await res.json();
    setForm({ ...form, image: json.url });
  };

  const submit = async () => {
    await fetch("http://localhost:4000/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    window.location.href = "/";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Listing</h1>

      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} /><br/><br/>
      <input placeholder="Price" type="number" onChange={e => setForm({ ...form, price: e.target.value })} /><br/><br/>
      <input placeholder="Bedrooms" type="number" onChange={e => setForm({ ...form, bedrooms: e.target.value })} /><br/><br/>
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} /><br/><br/>

      <input type="file" onChange={uploadImage} /><br/><br/>

      {form.image && <img src={form.image} width="200" />}

      <button onClick={submit}>Save</button>
    </div>
  );
}
