"use client"

import React from "react";

const login = () => {
  const fetchApi = async () => {
    const res = await fetch('http://localhost:3000/api/firstapi');
    const data = await res.json();
    console.log(data, "data");
    return data;
  };
  fetchApi();


  return (
    <>
      <h2>hello , this is the Login page</h2>
    </>
  );
};

export default login;
