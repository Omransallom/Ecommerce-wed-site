import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
const Navlinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

function Btmheader() {
  const location = useLocation();
  const [categories, setcategory] = useState([]);
  const [isCategiryOpen, setisCategiryOpen] = useState(false);
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setcategory(data));
  }, []);

  useEffect(() => {
    setisCategiryOpen(false);
  }, [location]);
  return (
    <>
      <div className="btm_header">
        <div className="container">
          <nav className="nav">
            <div className="category_nav">
              <div
                className="category_btn"
                onClick={() => setisCategiryOpen(!isCategiryOpen)}>
                <IoMdMenu />
                <p>Brwose category</p>
                <IoMdArrowDropdown />
              </div>
              <div
                className={`category_nav_list ${
                  isCategiryOpen ? "active" : ""
                }`}>
                {categories.map((category) => (
                  <Link key={category.slug} to={`category/${category.slug}`}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="nav_links">
              {Navlinks.map((items) => (
                <li
                  key={items.link}
                  className={location.pathname === items.link ? "active" : ""}>
                  <Link to={items.link}>{items.title}</Link>
                </li>
              ))}
            </div>
          </nav>
          <div className="sign_regs_icon">
            <Link to="/">
              <PiSignInBold />
            </Link>
            <Link to="/">
              <FaUserPlus />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Btmheader;
