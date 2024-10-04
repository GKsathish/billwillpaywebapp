import React, { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Menu from "./components/Menu/Menu";
import Recharge from "./components/Recharge/Recharge";
import Notification from "./components/Notification/Notification";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import DTH from "./components/DTH/DTH";
import OtherPages from "./components/Other/OtherPages";
import Transaction from "./components/Transaction/Transaction";
import Entertainment from "./components/Entertainment/Entertainment";
import History from "./components/History/History";

function App() {
  const [note, setnote] = useState();
  const [loginstatus, setLoginstatus] = useState(false);
  const [showloginpage, setShowloginpage] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("success") || window.sessionStorage.getItem("success")) {
      setnote(<Notification status="Success" message={window.sessionStorage.getItem("success")} showstatus={setnote} />);
      window.sessionStorage.removeItem('success');
    } else if (window.sessionStorage.getItem("danger") || window.sessionStorage.getItem("danger")) {
      setnote(<Notification status="Danger" message={window.sessionStorage.getItem("danger")} showstatus={setnote} />);
      window.sessionStorage.removeItem("danger");
    }

    if (window.sessionStorage.getItem("number") && window.sessionStorage.getItem("key")) {
      setLoginstatus(true)
    }
  }, [])

  const handleloginbutton = (e) => {
    setLoginstatus(e)
  }

  return (
    <HelmetProvider>
      <Menu loginstatuschange={handleloginbutton} loginstatus={loginstatus} setShowloginpage={setShowloginpage} />
      {note}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<HomePage loginpage={showloginpage} />} />
        <Route path="/recharge" exact element={<Recharge isPaused={isPaused} setIsPaused={setIsPaused} />} />
        <Route path="/dth" exact element={<DTH isPaused={isPaused} setIsPaused={setIsPaused} />} />
        <Route path="/entertainment" exact element={<Entertainment />} />
        <Route path="/history" exact element={<History />} />
        <Route path="/transaction-status/:id" element={<Transaction />} />
        {['terms-and-conditions', 'about-us', 'privacy-policy', 'refund-policy'].map((path, i) => <Route path={path} key={i} exact element={<OtherPages />} />)}
      </Routes>
      <Footer />

    </HelmetProvider>
  );
}

export default App;
