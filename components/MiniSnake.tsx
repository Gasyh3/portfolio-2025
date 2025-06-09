'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 10;
const INITIAL_SNAKE = [{ x: 4, y: 4 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 200; // Plus rapide pour une grille plus grande

export default function MiniSnake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 7, y: 7 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  // Générer une nouvelle position pour la nourriture
  const generateFood = useCallback(() => {
    let newFood: { x: number; y: number };
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  // Vérifier les collisions
  const checkCollision = useCallback((head: { x: number; y: number }) => {
    // Collision avec les murs
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Collision avec le serpent
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }, [snake]);

  // Mettre à jour le jeu
  const updateGame = useCallback(() => {
    if (isGameOver || !isGameActive) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (checkCollision(head)) {
        setIsGameOver(true);
        setIsGameActive(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Vérifier si le serpent mange la nourriture
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, checkCollision, generateFood, isGameActive]);

  // Gérer les touches
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isGameActive || isGameOver) return;

    e.preventDefault(); // Empêcher le scroll

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
    }
  }, [direction, isGameOver, isGameActive]);

  // Initialiser le jeu
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Configurer le jeu
  useEffect(() => {
    if (isLoading) return;

    const gameInterval = setInterval(updateGame, GAME_SPEED);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [updateGame, handleKeyPress, isLoading]);

  // Réinitialiser le jeu
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setIsGameOver(false);
    setScore(0);
    setIsGameActive(true);
    if (gameRef.current) {
      gameRef.current.focus();
    }
  };

  // Gérer le focus du jeu
  const handleGameFocus = () => {
    setIsGameActive(true);
  };

  const handleGameBlur = () => {
    setIsGameActive(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-pulse text-amber-300">Chargement du jeu...</div>
      </div>
    );
  }

  return (
    <div 
      className="w-full space-y-4 focus:outline-none focus:ring-4 focus:ring-amber-700/70 focus:ring-offset-4 focus:ring-offset-amber-900/60 focus:shadow-[0_0_25px_rgba(21,128,61,0.3)] rounded-lg p-2 transition-all duration-300"
      ref={gameRef}
      tabIndex={0}
      onFocus={handleGameFocus}
      onBlur={handleGameBlur}
    >
      <div className="flex justify-between items-center">
        <div className="text-amber-300">Score: {score}</div>
        {!isGameActive && !isGameOver && (
          <button
            onClick={resetGame}
            className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded hover:bg-amber-400/40 transition-colors"
          >
            Commencer
          </button>
        )}
        {isGameOver && (
          <button
            onClick={resetGame}
            className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded hover:bg-amber-400/40 transition-colors"
          >
            Recommencer
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-10 gap-1 aspect-square max-w-[300px] mx-auto">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={`aspect-square rounded-sm transition-colors ${
                isSnake
                  ? 'bg-amber-400'
                  : isFood
                  ? 'bg-amber-600'
                  : 'bg-amber-900/30'
              }`}
            />
          );
        })}
      </div>

      <div className="text-center text-sm text-amber-100/60">
        {isGameActive 
          ? "Utilisez les flèches du clavier pour diriger le serpent"
          : "Cliquez sur Commencer pour jouer"}
      </div>
    </div>
  );
} 