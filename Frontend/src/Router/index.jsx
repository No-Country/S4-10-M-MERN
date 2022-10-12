import React from "react";
import { Routes, Route } from "react-router-dom";
import Hangman from "../components/Hangman";
import Layout from "../components/Layout";
import { WordleGame } from "../pages/WordleGame";
import LoginSignUp from "../pages/LoginSignUp";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/hangman" element={<Hangman/>} />
        <Route path="/loginSignUp" element={<LoginSignUp/>} />
        <Route path="/wordle" element={<WordleGame />} />
        <Route index element={<h1>ruta raiz</h1>} />
      </Route>
      <Route path="*" element={<h1>Ruta no encontrada</h1>} />
    </Routes>
  );
};
