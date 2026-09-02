import React, { useEffect, useState } from "react";

import { Await, useParams } from "react-router-dom";
import "./productDetsildLoading";
import "./prouductDetails.css";
import "../../../src/components/slideProducts/slideproduct";
import Slideproduct from "../../../src/components/slideProducts/slideproduct";
import ProductDetsildLoading from "./productDetsildLoading";
import SlideProductLoadin from "../../components/slideProducts/slideProductLoadin";
import ProductImages from "./productImages";
import ProductInfo from "./productInfo";
import PageTransition from "../../components/Pageransition";

function ProductDetails() {
  const { id } = useParams();
  console.log(id);
  const [product, setproduct] = useState(null);
  const [loading, setloading] = useState(true);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [loadingrelatedProducts, setloadingrelatedProducts] = useState(true);

  useEffect(() => {
    const fethProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setproduct(data);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fethProduct();
  }, [id]);
  useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setrelatedProducts(data.products);
      })
      .catch((error) => console.error(error))
      .finally(() => setloadingrelatedProducts(false));
  }, [product?.category]);

  return (
    <PageTransition key={id}>
      <div>
        {loading ? (
          <ProductDetsildLoading />
        ) : (
          <div className="item_details">
            <div className="container">
              <ProductImages product={product} />
              <ProductInfo product={product} />
            </div>
          </div>
        )}
        {loadingrelatedProducts ? (
          <SlideProductLoadin />
        ) : (
          <Slideproduct
            key={product.category}
            data={relatedProducts}
            title={product.category.replace("-", " ")}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default ProductDetails;
