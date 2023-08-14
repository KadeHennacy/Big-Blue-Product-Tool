import { Route, Routes } from "react-router";
import { Theme } from "../../Theme";
import Home from "../common/pages/home";
import Topbar from "../common/components/Topbar";
import Product from "../features/product";
import Browse from "../features/browse";
import Lot from "../features/lot";

function App() {
  return (
    <Theme>
      <Topbar />
      <Routes>
        <Route path="/index.html" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/lot" element={<Lot />} />
      </Routes>
    </Theme>
  );
}

export default App;
