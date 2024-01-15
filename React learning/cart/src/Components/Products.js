import "./products.css";
import { useEffect } from "react";
import { fetchProducts } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import Form from "./Form";

const Products = () => {
  const dispatch = useDispatch();
  const getAllProduct = useSelector((state) => {
    return state.product;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
    <Form/>
      <ul className="productswrapper">
        {getAllProduct.data.map((product) => (
          <li key={product.id} >
            <div className="card">
              <img className="card-image" src={product.image} alt="" />
              <h4>{product.title}</h4>
              <h5>{product.price}</h5>
              <button onClick={() => dispatch(add(product))} className="btn">
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
