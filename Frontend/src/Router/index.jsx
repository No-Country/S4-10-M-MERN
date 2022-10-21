import React from "react";
import { Routes, Route } from "react-router-dom";
import Hangman from "../pages/HangmanGame";
import Layout from "../components/Layout";
import { WordleGame } from "../pages/WordleGame";
import WordleBattlePrepare from "../components/WordleBattleComponents/WordleBattlePrepare";
import WordleBattle from "../components/WordleBattleComponents/WordleBattle";
<<<<<<< HEAD
import { SoundGame } from "../pages/SoundGame";
=======
import CRUDMovies from "../components/CRUDMovies";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login/index.jsx";
import Signup from "../pages/Signup/index.jsx";
>>>>>>> 8de38f0b744fa503679dca1e20170ff2d1b9c1c4

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/hangman" element={<Hangman />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wordle" element={<WordleGame />} />
        <Route path="/soundgame" element={<SoundGame/>} />
        <Route path="/wordle-battle" element={<WordleBattlePrepare />} />
        <Route path="/wordle-battle/game" element={<WordleBattle />} />
        <Route path="/CRUDMovies" element={<CRUDMovies />} />
        <Route index element={<Welcome />} />
      </Route>
      <Route path="*" element={<h1>Ruta no encontrada</h1>} />
    </Routes>
  );
};
