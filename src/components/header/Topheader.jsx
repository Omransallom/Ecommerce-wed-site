import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import "./header.css";
import { CartContext } from "../context/CartContext";
import SearchBox from "./SearchBox";

function Topheader() {
  const { cartItems, favorites } = useContext(CartContext);
  return (
    <div className="top_header">
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <SearchBox />
        <div className="header-icons">
          <div className="icon">
            <Link to={"/favorites"}>
              <CiHeart />
              <span>{favorites.length}</span>
            </Link>
          </div>
          <div className="icon">
            <Link to="/cart">
              <TiShoppingCart />
              <span>{cartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topheader;
