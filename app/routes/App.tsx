import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import Listing from "./listing";
import SingleItem from "./singleItem";
import Layout from "../components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/listing" element={<Layout><Listing /></Layout>} />
        <Route path="/listing/:id" element={<Layout><SingleItem /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;