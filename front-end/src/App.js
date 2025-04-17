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
import UserPreviousLetters from "./pages/UserPreviousLetters";
import PricingCoverLetter from "./pages/PricingCoverLetter";
import UserProfile from "./pages/UserProfile";

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
            path="/coverLetterCreator"
            element={<CoverLetterGenerator />}
          />
          <Route path="/previousLetters" element={<UserPreviousLetters />} />
          <Route path="/pricingCoverLetter" element={<PricingCoverLetter />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
