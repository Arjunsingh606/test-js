import React from "react";
import Products from "../Components/Products";

const Home = () => {
  return (
    <>
      <div>
        <h2 className="heading">Latest Products</h2>
      </div>
      <hr />
      <section>
        <Products />
      </section>
    </>
  );
};

export default Home;
