import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Wordle } from "../../components/WordleComponents/Wordle";

export const WordleGame = () => {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
};
