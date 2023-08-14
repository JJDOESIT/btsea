import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import VerifyEmail from "./pages/verifyEmail";
import React from "react";
import Base from "./pages/base";

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
      </Routes>
    </>
  );
}

export default App;
