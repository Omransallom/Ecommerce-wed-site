import React, { useContext } from "react";
import { FaRegHeart, FaShare, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../components/context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProductInfo({ product }) {
  const { cartItems, addToCart, favorites, addToFavorites, removeFromFav } =
    useContext(CartContext);
  const isInCart = cartItems.some((i) => i.id === product.id);

  const navigat = useNavigate();
  const isInFav = favorites.some((i) => i.id === product.id);

  const handeleAddToCart = () => {
    addToCart(product);
    toast.success(
      <div className="stoast-wrapper">
        <img src={product.images[0]} alt="" className="toast-img" />
        <div className="toast-content">
          <strong>{product.title}</strong>
          added to Cart
        </div>
        <div>
          <button className="btn" onClick={() => navigat("/cart")}>
            View Cart
          </button>
        </div>
      </div>,
      { duration: 3500 }
    );
  };
  const handleToFav = () => {
    if (isInFav) {
      removeFromFav(product.id);
      toast.error(`${product.title} Removed From Favorites`);
    } else {
      addToFavorites(product);
      toast.success(`${product.title} Add To Favorites`);
    }
  };
  return (
    <div className="details_item">
      <h1 className="name">{product.title}</h1>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStarHalfStroke />
      </div>
      <p className="price">$ {product.price}</p>
      <h5>
        Availability: <span>{product.availabilityStatus}</span>
      </h5>
      <h5>
        Brand: <span>{product.brand}</span>
      </h5>
      <p className="desc">{product.description}</p>
      <h5 className="stock">
        <span>Hurry Up! only {product.stock} Products left in stock.</span>
      </h5>
      <button
        onClick={handeleAddToCart}
        className={`btn ${isInCart ? "in-cart" : ""}`}>
        {isInCart ? "item in cart" : "add To Cart"} <TiShoppingCart />
      </button>
      <div className="icons">
        <span className={`${isInFav ? "in-fav" : ""}`} onClick={handleToFav}>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
