import Topheader from "./components/header/Topheader";
import Btmheader from "./components/header/Btmheader";
import Home from "./page/home/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./page/productDetails/productDetails";
import Cart from "./page/cart/cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/scrollToTop";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./page/categoryPage/categoryPage";
import SearchResults from "./page/SearchResults";
import Favorites from "./page/favorites/favorites";

function App() {
  return (
    <>
      <header>
        <Topheader />
        <Btmheader />
      </header>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
