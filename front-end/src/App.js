import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";

import "./styles/styles.css";
import SingleDebate from "./pages/SingleDebate";
import Footer from "./components/Footer";
import Info from "./pages/Info";
import LoginScreen from "./pages/LoginScreen";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/singleDebate/:id" element={<SingleDebate />} />
          <Route path="/info" element={<Info />} />
          <Route path="/loginScreen" element={<LoginScreen />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route
            path="/coverLetterGenerator"
            element={<CoverLetterGenerator />}
          />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
