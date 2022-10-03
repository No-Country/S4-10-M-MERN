import logo from "./logo.svg";
import "./App.css";

import { Login } from "../src/components/login/index";
import { Register } from "../src/components/register/index";
import React, { useState } from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
   <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>path /</h1>} />
        <Route path="/home" element={<h1>path /home</h1>} />
      </Routes>
    </BrowserRouter>

    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
   </div>
   
  );
}

export default App;
