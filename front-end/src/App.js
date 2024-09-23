import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";

import "./styles/styles.css";
import SingleDebate from "./pages/SingleDebate";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/singleDebate/:id" element={<SingleDebate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
