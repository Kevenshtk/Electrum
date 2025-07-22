import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import ProductsRegister from "./pages/register/products";
import ListProducts from "./pages/listProducts";
import Login from "./pages/login";
import "./styles/reset.sass";

function App() {
  const [thisLoggedIn, setThisLoggedIn] = useState({
    status: false,
    email: '',
    name: ''
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home thisLoggedIn={thisLoggedIn}/>} />
        <Route path="/register/products" element={<ProductsRegister />} />
        <Route path="/list/:category" element={<ListProducts thisLoggedIn={thisLoggedIn}/>} />
        <Route path="/login" element={<Login setThisLoggedIn={setThisLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default App;
