"use client";
import { useEffect, useState } from "react";

const RANDOMIZE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const RandomizeText = ({
  children,
  loops,
}: {
  children: string;
  loops: number;
}) => {
  const text = children.toUpperCase();
  const [iterations, setIterations] = useState(text.length * loops);

  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (i < (text.length * loops - iterations) / loops) {
      result += text[i];
      continue;
    }
    result += RANDOMIZE[Math.floor(Math.random() * RANDOMIZE.length)];
  }

  const deRandomize = () => {
    const randInterval = setInterval(() => {
      if (iterations === 0) clearInterval(randInterval);
      setIterations(iter => iter - 1);
    }, 30);
  };

  useEffect(deRandomize, [deRandomize]);

  return <p>{result}</p>;
};

export default RandomizeText;
