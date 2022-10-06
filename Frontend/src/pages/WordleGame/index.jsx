import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Wordle } from "../../components/WordleComponents/Wordle";

const solutionsHarcodeado = [
  { id: 1, word: "ninja" },
  { id: 2, word: "spade" },
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
  { id: 15, word: "hello" },
];

export const WordleGame = () => {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    // fetch("http://localhost:3001/solutions")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     // random int between 0 & 14

    //     const randomSolution = json[Math.floor(Math.random() * json.length)];
    //     console.log(randomSolution.word);
    //     setSolution(randomSolution.word);
    //   });
    
    const randomSolution =
    solutionsHarcodeado[
      Math.floor(Math.random() * solutionsHarcodeado.length)
    ];
    setTimeout(() => {
      setSolution(randomSolution.word);
      setLoading(false)
    },1500);


    
  }, [setSolution]);
  return loading ? (
    <div className='divLoader'>
     <Loading />
    </div>): 
  
    <Wordle solution={solution} />;
};
