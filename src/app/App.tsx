import { Route, Routes } from "react-router";
import { Theme } from "../../Theme";
import Home from "../common/pages/home";
import Topbar from "../common/components/Topbar";

function App() {
  return (
    <Theme>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Theme>
  );
}

export default App;
