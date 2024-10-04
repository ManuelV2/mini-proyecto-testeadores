"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Para regresar al lobby

export default function SequenceMemoryGame() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [round, setRound] = useState(1);
  const [maxLostRound, setMaxLostRound] = useState(0); // Estado para almacenar la ronda más lejana perdida
  const [message, setMessage] = useState("Presiona un cuadro para comenzar el juego.");
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null); // Para resaltar el cuadro en verde
  const [isWrong, setIsWrong] = useState(false); // Estado para controlar el error
  const [isPlayingSequence, setIsPlayingSequence] = useState(false); // Estado para saber si se está reproduciendo la secuencia

  useEffect(() => {
    const savedMaxLostRound = localStorage.getItem("maxLostRound");
    if (savedMaxLostRound) {
      setMaxLostRound(parseInt(savedMaxLostRound, 10));
    }
  }, []);

  const startRound = () => {
    const newSequence = [...sequence, Math.floor(Math.random() * 9)]; // Agregar un nuevo número a la secuencia
    setSequence(newSequence);
    setUserSequence([]);
    setIsPlayerTurn(false);
    setMessage("Espera la secuencia...");
    setIsWrong(false); // Reiniciar el estado de error al iniciar una nueva ronda
    playSequence(newSequence);
  };

  const playSequence = (sequence) => {
    setIsPlayingSequence(true); // Indica que se está reproduciendo la secuencia
    sequence.forEach((index, i) => {
      setTimeout(() => {
        setActiveIndex(index);
      }, i * 1000);

      setTimeout(() => {
        setActiveIndex(null);
        if (i === sequence.length - 1) {
          setIsPlayerTurn(true);
          setIsPlayingSequence(false); // Fin de la secuencia
          setMessage("Repite la secuencia");
        }
      }, i * 1000 + 500);
    });
  };

  const handleSquareClick = (index) => {
    if (gameOver) {
      handleRestart();
      return;
    }

    if (sequence.length === 0) {
      startRound();
      return;
    }

    if (!isPlayerTurn || isPlayingSequence) return; // Bloquear clics durante la secuencia

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Resalta el cuadro que el usuario hizo clic
    setHighlightedIndex(index);
    setTimeout(() => {
      setHighlightedIndex(null); // Quitar el resaltado después de un breve tiempo
    }, 300);

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setIsWrong(true); // Indicar que hubo un error
      setMessage("¡Te equivocaste! Juego terminado.");
      setGameOver(true);

      if (round > maxLostRound) {
        setMaxLostRound(round);
        localStorage.setItem("maxLostRound", round);
      }
    } else {
      if (newUserSequence.length === sequence.length) {
        setMessage("¡Bien hecho! Pasas al siguiente nivel.");
        setRound(round + 1); // Sube de nivel
        setTimeout(startRound, 1000); // Espera antes de comenzar la próxima ronda
      }
    }
  };

  const handleRestart = () => {
    setGameOver(false);
    setRound(1);
    setMessage("Presiona un cuadro para comenzar el juego."); // Mensaje inicial
    setUserSequence([]);
    setSequence([]);
    setIsWrong(false);
  };

  return (
    <div className="container mx-auto p-6 bg-black min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Juego de Secuencia de Memoria</h1>
      <p className="text-lg text-gray-300 mb-4">Ronda: {gameOver ? round - 1 : round}</p>
      <p className="text-lg text-gray-300 mb-6">Récord de rondas: {maxLostRound}</p>
      <p className="text-lg text-gray-300 mb-6">{message}</p>

      <div style={styles.grid}>
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleSquareClick(index)}
            style={{
              ...styles.square,
              backgroundColor:
                highlightedIndex === index
                  ? isWrong
                    ? "#FF4D4D"
                    : "#66FF66"
                  : activeIndex === index
                  ? "#FFD700"
                  : "#444", // Color de fondo más oscuro para un mejor contraste
              cursor:
                (isPlayerTurn && !isPlayingSequence) || sequence.length === 0 || gameOver
                  ? "pointer"
                  : "default",
              boxShadow: highlightedIndex === index ? (isWrong ? "0 0 15px red" : "0 0 15px green") : "none",
            }}
          ></div>
        ))}
      </div>

      {gameOver && (
        <div style={styles.gameOverContainer}>
          <h2 style={styles.gameOverTitle}>Juego Terminado</h2>
          <p style={styles.gameOverMessage}>Rondas completadas: {round - 1}</p>
        </div>
      )}

      <Link href="/">
        <button className="mt-6 bg-gray-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition">
          Regresar al Lobby
        </button>
      </Link>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  square: {
    width: "100px",
    height: "100px",
    backgroundColor: "#444", // Fondo más oscuro para los cuadros
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    transition: "background-color 0.3s, box-shadow 0.3s",
  },
  gameOverContainer: {
    marginTop: "20px",
  },
  gameOverTitle: {
    fontSize: "1.5em",
    color: "#e74c3c",
  },
  gameOverMessage: {
    fontSize: "1.2em",
    color: "#fff", // Texto blanco para mayor contraste
  },
};

