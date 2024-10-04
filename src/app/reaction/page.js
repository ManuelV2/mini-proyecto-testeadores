"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ReactionGame() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const [shortestTime, setShortestTime] = useState(null);
  const [message, setMessage] = useState('Presiona "Iniciar" para comenzar.');
  const [startTime, setStartTime] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const totalAttempts = 5;
  let timeoutId = null;

  const startGame = () => {
    setMessage('Espera al color verde...');
    setIsWaiting(true);
    setHasStarted(true);
    startRandomDelay();
  };

  const startRandomDelay = () => {
    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2 a 5 segundos
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setMessage('¡Haz clic ahora!');
      setStartTime(Date.now());
      setIsWaiting(false);
    }, randomDelay);
  };

  const handleClick = () => {
    if (isWaiting) {
      setMessage('¡Muy rápido! Aún no ha cambiado a verde.');
    } else if (startTime) {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setAttempts((prevAttempts) => [...prevAttempts, reaction]);
      setMessage(`Tu tiempo de reacción fue de ${reaction} ms.`);
      setStartTime(null);

      if (shortestTime === null || reaction < shortestTime) {
        setShortestTime(reaction);
      }

      if (attempts.length + 1 >= totalAttempts) {
        const totalTime = [...attempts, reaction].reduce((acc, time) => acc + time, 0);
        const averageTime = totalTime / totalAttempts;
        setMessage(`¡Juego terminado! Tu promedio de tiempo de reacción es de ${averageTime.toFixed(2)} ms.`);
        resetGame();
      } else {
        setHasStarted(false);
        setMessage('Presiona "Iniciar" para el siguiente intento.');
      }
    }
  };

  const resetGame = () => {
    setIsWaiting(false);
    setHasStarted(false);
    setReactionTime(null);
    setAttempts([]);
    setMessage('Presiona "Iniciar" para comenzar.');
    setShortestTime(null);
    clearTimeout(timeoutId);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">Juego de Tiempo de Reacción</h1>
      <p className="text-lg text-gray-700 mb-4">
        Intenta hacer clic lo más rápido posible cuando la pantalla se ponga verde.
      </p>
      <p className="text-lg text-gray-700 mb-6">Intentos: {attempts.length} / {totalAttempts}</p>

      <div
        onClick={hasStarted ? handleClick : startGame}
        className={`w-64 h-64 flex items-center justify-center rounded-lg shadow-lg text-xl font-bold cursor-pointer transition-all ${
          isWaiting ? 'bg-red-500 text-white' : startTime ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        <p>{message}</p>
      </div>

      {reactionTime && (
        <p className="text-xl text-gray-700 mt-4">
          Último tiempo de reacción: <span className="font-semibold">{reactionTime} ms</span>
        </p>
      )}
      {shortestTime !== null && (
        <p className="text-xl text-gray-700 mt-2">
          Tu tiempo de reacción más corto: <span className="font-semibold">{shortestTime} ms</span>
        </p>
      )}

      {attempts.length === totalAttempts && (
        <button
          onClick={resetGame}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Reiniciar Juego
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
