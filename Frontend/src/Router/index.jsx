import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { WordleGame } from "../pages/WordleGame";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="ahorcado" element={<h1>ahorcado game</h1>} />
        <Route index element={<WordleGame />} />
      </Route>
      <Route path="*" element={<h1>Ruta no encontrada</h1>} />
    </Routes>
  );
};
