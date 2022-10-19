import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Wordle } from "../../components/WordleComponents/Wordle";

const solutionsHarcodeado = [
  { id: 1, word: "NINJA" },
  /*{ id: 2, word: "spade" },
  { id: 3, word: "pools" },
  { id: 4, word: "drive" },
  { id: 5, word: "relax" },
  { id: 6, word: "times" },
  { id: 7, word: "train" },
  { id: 8, word: "cores" },
  { id: 9, word: "pours" },
  { id: 10, word: "blame" },
  { id: 11, word: "banks" },
  { id: 12, word: "phone" },
  { id: 13, word: "bling" },
  { id: 14, word: "coins" },
  { id: 15, word: "hello" },*/
];

export const WordleGame = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
     fetch("http://localhost:8080/api/v1/word")
       .then((res) => res.json())
       .then((json) => {
    //     // random int between 0 & 14
        console.log(json)
         setSolution(json.word.toLowerCase());
       });
//    const randomSolution =
//      solutionsHarcodeado[
//        Math.floor(Math.random() * solutionsHarcodeado.length)
//      ];
//    setSolution(randomSolution.word.toLowerCase());
  }, [setSolution]);
  return <Wordle solution={solution} />;
};
