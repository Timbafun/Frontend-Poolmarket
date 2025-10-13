import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserArea from "./pages/UserArea"; // ✅ Adicionado import da nova página

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-area" element={<UserArea />} /> {/* ✅ Nova rota */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
