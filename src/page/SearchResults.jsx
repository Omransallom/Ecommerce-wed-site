import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../components/Pageransition";
import Product from "../components/slideProducts/product";
import SlideProductLoadin from "../components/slideProducts/slideProductLoadin";

function SearchResults() {
  const [results, setresults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("query");

  const [loading, setloading] = useState(true);
  console.log(results);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await res.json();
        setresults(data.products || []);
      } catch (erroe) {
        console.error(erroe);
      } finally {
        setloading(false);
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <PageTransition key={query}>
      <div className="category_Products">
        {loading ? (
          <SlideProductLoadin key={query} />
        ) : results.length > 0 ? (
          <div className="container">
            <div className="top-slide">
              <h2>Results for : {query}</h2>
            </div>
            <div className="products">
              {results.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <p>No results found.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default SearchResults;
