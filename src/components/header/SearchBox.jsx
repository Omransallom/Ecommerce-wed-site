import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SearchBox() {
  const [SearchTerm, setSearchTerm] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (SearchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(SearchTerm.trim())}`);
    }
    setsuggestions([]);
  };

  useEffect(() => {
    const fetchsuggestions = async () => {
      if (!SearchTerm.trim()) {
        setsuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${SearchTerm}`
        );
        const data = await res.json();
        setsuggestions(data.products.slice(0, 5) || []);
      } catch (erroe) {
        console.error(erroe);
        setsuggestions([]);
      }
    };
    const debonce = setTimeout(() => {
      fetchsuggestions();
    }, 300);
    return () => clearTimeout(debonce);
  }, [SearchTerm]);
  console.log(suggestions);

  useEffect(() => {
    setsuggestions([]);
  }, [location]);

  return (
    <div>
      <div className="SearchBox_Container">
        <form onSubmit={handleSubmit} className="search_box">
          <input
            type="text"
            name="Search"
            id="Search"
            placeholder="Search For Productes"
            autoComplete="off"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((item) => (
              <Link to={`/products/${item.id}`}>
                <li key={item.id}>
                  <img src={item.images[0]} alt="" />
                  <span>{item.title}</span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
