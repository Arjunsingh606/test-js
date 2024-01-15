"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../src/styles/Home.module.css";
import Script from "next/script";

const FetchData = () => {
  const [item, setItem] = useState([]);

  console.log(item, "item--------------------------");
  console.log(Script);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      return setItem(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h3>Hello , fetchdata page</h3>

      <Image
        src="next.svg"
        width={500}
        height={500}
        alt="Load hogi , preshan mat ho"
      />
      {item &&
        item.map((user) => {
          return (
            <div key={user.id} className={styles.text}>
              {user.name}
            </div>
          );
        })}

        <Script src="https://example.com/script.js"/>
    </>
  );
};

export default FetchData;
