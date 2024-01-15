import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((store) => store.cart);

  return (
    <div className="navItems">
      <span className="logo">E-Commerce Store</span>
      <div className="navbarItem">
        <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/Cart">
          Cart
        </Link>
        <span className="cartCount">cart item:{items.length}</span>
      </div>
    </div>
  );
};

export default Navbar;
