import React, { useEffect, useState } from "react";
import "./index.css";

export default function Keypad({ keys, usedKeys }) {
  const [letters, setLetters] = useState();

  useEffect(() => {
    setLetters(keys);
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((l, index) => {
          const color = usedKeys[l.key];
          return (
            <div key={index} onClick={() => window.dispatchEvent(new KeyboardEvent("keyup", keys[index]))} className={color}>
              {l.key === "Backspace" ? "BORRAR" : (l.key).toUpperCase()}
            </div>
          );
        })}
    </div>
  );
}
