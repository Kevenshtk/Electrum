import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import ProductsRegister from "./pages/register/products";
import ListProducts from "./pages/listProducts";
import Login from "./pages/login";
import "./styles/reset.sass";

function App() {
  const [currentUser , setCurrentUser ] = useState({
    status: false,
    email: '',
    name: ''
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser}/>} />
        <Route path="/register/products" element={<ProductsRegister />} />
        <Route path="/list/:category" element={<ListProducts currentUser={currentUser}/>} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
