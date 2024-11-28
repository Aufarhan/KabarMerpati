import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Programming from "./pages/Programming";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  );
};

export default App;
