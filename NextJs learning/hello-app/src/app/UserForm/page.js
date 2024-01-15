"use client";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();

  const handleButton = async () => {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        city,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
   const data = await response.json();
    console.log(data, "data post api");
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button onClick={handleButton}>add user</button>
      </div>
    </>
  );
};

export default page;
