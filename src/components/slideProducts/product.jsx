import React, { useContext } from "react";
import { FaCartArrowDown, FaRegHeart, FaShare, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";
function Product({ item }) {
  const navigat = useNavigate();
  const { cartItems, addToCart, favorites, addToFavorites, removeFromFav } =
    useContext(CartContext);

  const isInCart = cartItems.some((i) => i.id === item.id);
  const isInFav = favorites.some((i) => i.id === item.id);

  const handeleAddToCart = () => {
    addToCart(item);
    toast.success(
      <div className="stoast-wrapper">
        <img src={item.images[0]} alt="" className="toast-img" />
        <div className="toast-content">
          <strong>{item.title}</strong>
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
      removeFromFav(item.id);
      toast.error(`${item.title} Removed From Favorites`);
    } else {
      addToFavorites(item);
      toast.success(`${item.title} Add To Favorites`);
    }
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        <span className="status_cart">
          <FaCheck /> in cart
        </span>
        <div className="img_product">
          <img src={item.images[0]} alt="" />
        </div>
        <p className="name_product">{item.title}</p>
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
        <p className="price">
          <span>{item.price}</span>
        </p>
      </Link>
      <div className="icons">
        <span className="btn_addToCart" onClick={handeleAddToCart}>
          <FaCartArrowDown />
        </span>
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

export default Product;
