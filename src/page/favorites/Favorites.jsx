import React, { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import PageTransition from "../../components/Pageransition";
import Product from "../../components/slideProducts/product";

function Favorites() {
  const { favorites } = useContext(CartContext);
  return (
    <PageTransition>
      <div className="category_Products FavoritesPage">
        <div className="container">
          <div className="top-slide">
            <h2>Your Favorites</h2>
          </div>
          {favorites.length === 0 ? (
            <p>NO Favorites Products Yet</p>
          ) : (
            <div className="products">
              {favorites.map((item) => (
                <Product item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Favorites;
