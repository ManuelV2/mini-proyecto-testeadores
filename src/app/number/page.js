"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NumberMemoryGame() {
  const [number, setNumber] = useState('');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [round, setRound] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [checkedResult, setCheckedResult] = useState(null);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    let interval;
    if (showNumber) {
      let progressTime = 3500;
      const intervalTime = 50;
      setProgress(100);
      interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress - (100 / (progressTime / intervalTime)));
      }, intervalTime);

      timer = setTimeout(() => {
        setShowNumber(false);
        setMessage('¿Cuál fue el número?');
        clearInterval(interval);
      }, progressTime);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [showNumber]);

  const generateNumber = () => {
    const digits = round + 1; // Controla la cantidad de dígitos
    const randomNumber = Math.floor(Math.random() * Math.pow(10, digits)); // Genera un número con 'digits' dígitos
    setNumber(randomNumber.toString());
    setShowNumber(true);
    setMessage('');
    setInput('');
    setCheckedResult(null);
    setRound((prevRound) => prevRound + 1);
  };

  const checkAnswer = () => {
    if (input === number) {
      setMessage('¡Correcto!');
      setCheckedResult(null); 
      setInput(''); 
      setTimeout(() => {
        generateNumber(); 
      }, 1000); 
    } else {
      setMessage(`Incorrecto, el número era ${number}. Has llegado a la ronda ${round}.`);
      setRound(0); 
      compareDigits();
      setNumber('');
      setInput('');
    }
  };

  const compareDigits = () => {
    const result = [];
    for (let i = 0; i < number.length; i++) {
      if (input[i] === number[i]) {
        result.push(<span key={i}>{input[i]}</span>);
      } else {
        result.push(
          <span key={i} style={{ textDecoration: 'line-through', color: 'red' }}>
            {input[i] || '_'}
          </span>
        );
      }
    }
    setCheckedResult(result);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">Juego de Memoria Numérica</h1>
      <p className="text-lg text-gray-700 mb-4">Ronda: {round}</p>

      {showNumber && (
        <>
          <div className="w-full h-2 bg-gray-300 rounded-lg overflow-hidden mb-4">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 drop-shadow-lg">{number}</h2>
        </>
      )}

      {!showNumber && round > 0 && (
        <div className="mb-4">
          <input
            className="border border-gray-400 rounded-lg p-3 text-center text-xl text-gray-900 shadow-lg"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Introduce el número"
          />
          <button
            onClick={checkAnswer}
            className="ml-3 bg-blue-600 text-white rounded-lg px-5 py-2 shadow-lg hover:bg-blue-700 transition"
          >
            Comprobar
          </button>
        </div>
      )}

      {message && <p className="text-lg text-red-600 mb-4">{message}</p>}
      {checkedResult && <p className="text-lg text-gray-700">Resultado: {checkedResult}</p>}

      {round === 0 && (
        <button
          onClick={generateNumber}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
        >
          Iniciar Ronda
        </button>
      )}

      <Link href="/">
        <button className="mt-6 bg-gray-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition">
          Regresar al Lobby
        </button>
      </Link>
    </div>
  );
}
