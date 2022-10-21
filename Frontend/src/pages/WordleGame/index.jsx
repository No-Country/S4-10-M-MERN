import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Wordle } from "../../components/WordleComponents/Wordle";

<<<<<<< HEAD
=======
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

>>>>>>> 8de38f0b744fa503679dca1e20170ff2d1b9c1c4
export const WordleGame = () => {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    setLoading(true)
    fetch("http://localhost:8080/api/v1/word")
      .then((res) => res.json())
      .then((json) => {
        // random int between 0 & 
        setSolution(json.word);
        setLoading(false);
      });
  }, []);

  console.log(solution);

  return loading ? (
    <div className='divLoader'>
     <Loading />
    </div>): 
  
    <Wordle solution={solution} />;
=======
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
>>>>>>> 8de38f0b744fa503679dca1e20170ff2d1b9c1c4
};
