import React from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { remove, increment, decreament } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  return (
    <>
      <h3>Cart Items</h3>
      <ul className="cartWrapper">
        {products.map((product) => (
          <li key={product.id}>
            <div className="cartCard" key={product.id}>
              <img src={product.image} alt="image is loading" />
              <h5>{product.title}</h5>
              <h5>{product.price}</h5>
              <h5>Quantity:{products.length}</h5>
              <button
                onClick={() => handleRemove(product.id)}
                className="cart-btn"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cart;
