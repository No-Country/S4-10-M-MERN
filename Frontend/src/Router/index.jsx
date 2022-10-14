import React from "react";
import { Routes, Route } from "react-router-dom";
import Hangman from "../pages/HangmanGame";
import Layout from "../components/Layout";
import { WordleGame } from "../pages/WordleGame";
import LoginSignUp from "../pages/LoginSignUp";
import WordleBattlePrepare from "../components/WordleBattleComponents/WordleBattlePrepare";
import WordleBattle from "../components/WordleBattleComponents/WordleBattle";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/hangman" element={<Hangman/>} />
        <Route path="/loginSignUp" element={<LoginSignUp/>} />
        <Route path="/wordle" element={<WordleGame />} />
        <Route path="/wordle-battle" element={<WordleBattlePrepare />} />
        <Route path="/wordle-battle/game" element={<WordleBattle />} />
        <Route index element={<h1>ruta raiz</h1>} />
      </Route>
      <Route path="*" element={<h1>Ruta no encontrada</h1>} />
    </Routes>
  );
};
