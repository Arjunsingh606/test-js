"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const loginUser = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/users");
      const data = await res.json();
      return setItem(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Hello</h2>
        {item &&
          item.map((user) => (
            <div>
              <Link href={`login/username/${user.id}`}>{user.name}</Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default loginUser;
