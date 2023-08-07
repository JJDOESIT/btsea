import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar.js";
import { Routes, Route } from "react-router-dom";
import '../styles/dashboard.css'
import Logout from "./logout.js";
import Home from "./home.js";

export default function Dashboard() {
  useEffect(() => {
    const postAuthUser = "http://127.0.0.1:8000/framework/verify-auth-user/";
    const data = { email: "email" };
    axios
      .post(postAuthUser, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className='dashboard-container'>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="logout/" element={<Logout></Logout>}></Route>
      </Routes>
    </div>
  );
}
