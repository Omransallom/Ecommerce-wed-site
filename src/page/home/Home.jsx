import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/heroSlider";
import "./Home.css";
import Slideproduct from "../../components/slideProducts/slideproduct";
import SlideProductLoadin from "../../components/slideProducts/slideProductLoadin";
import PageTransition from "../../components/Pageransition";
// import { data } from "react-router-dom";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];

export default function Home() {
  const [loading, setloading] = useState(true);
  const [products, setproducts] = useState({});
  useEffect(() => {
    const fetshProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();

            return { [category]: data.products };
          })
        );

        const productData = Object.assign({}, ...results);

        setproducts(productData);
      } catch (error) {
        console.error("error fetching", error);
      } finally {
        setloading(false);
      }
    };
    fetshProducts();
  }, []);
  return (
    <PageTransition>
      <div>
        <HeroSlider />
        {loading
          ? categories.map((category) => <SlideProductLoadin key={category} />)
          : categories.map((category) => (
              <Slideproduct
                key={category}
                data={products[category]}
                title={category.replace("-", " ")}
              />
            ))}
      </div>
    </PageTransition>
  );
}
