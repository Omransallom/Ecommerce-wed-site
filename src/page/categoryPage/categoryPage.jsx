import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/product";
import "./categoryPage.css";
import SlideProductLoadin from "../../components/slideProducts/slideProductLoadin";
import PageTransition from "../../components/Pageransition";
function CategoryPage() {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setloading(false));
  }, [category]);

  return (
    <PageTransition key={category}>
      <div className="category_Products">
        {loading ? (
          <SlideProductLoadin key={category} />
        ) : (
          <div className="container">
            <div className="top-slide">
              <h2>
                {category}: {categoryProducts.limit}
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                aspernatur fugiat. Illum tempore optio et dolorum ducimus
                consequatur eius sint magni odio?
              </p>
            </div>
            <div className="products">
              {categoryProducts.products.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default CategoryPage;
