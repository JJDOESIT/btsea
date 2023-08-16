import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import VerifyEmail from "./pages/verifyEmail";
import React from "react";
import Base from "./pages/base";
import Analytics from "./pages/analytics";
import NotFound from "./pages/notFound";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="" element={<Base></Base>}></Route>
        <Route path="register/" element={<Register></Register>}></Route>
        <Route path="login/" element={<Login></Login>}></Route>
        <Route path="verify/:token/:uid" element={<div></div>}></Route>
        <Route path="dashboard/*" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="verify-email/"
          element={<VerifyEmail></VerifyEmail>}
        ></Route>
        <Route path="analytics/" element={<Analytics></Analytics>}></Route>
        <Route path="not-found/" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
