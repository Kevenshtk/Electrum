import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import ProductsRegister from "./pages/register/products";
import ListProducts from "./pages/listProducts";
import "./styles/reset.sass";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/products" element={<ProductsRegister />} />
        <Route path="/list/:category" element={<ListProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
