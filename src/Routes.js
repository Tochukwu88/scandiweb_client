import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import AddProduct from "./AddProduct";

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/add-products" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}
