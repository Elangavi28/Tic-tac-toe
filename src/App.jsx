import React, { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  //[null,null,null,null,null,null,null,null,null]

  const [isXTrun, setIsXTrun] = useState(true);

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  function getWinner(squares) {
    for (let combination of winningCombination) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleSquareClick(index) {
    if (board[index] || getWinner(board)) return;

    const upadatedBoard = [...board];
    upadatedBoard[index] = isXTrun ? "x" : "O";

    setBoard(upadatedBoard);
    setIsXTrun(!isXTrun);
  }

  function getGameStatus() {
    const winner = getWinner(board);

    if (winner) {
      return `winner : ${winner}`;
    }

    if (board.every((square) => square !== null)) {
      return "It is a Draw";
    }
    return `Next Player : ${isXTrun ? "X" : "O"}`;
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setIsXTrun("true");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex item-center justify-center">
      <div className="w-full max-w-[400px] mx-5">
        <h1 className="text-5xl font-semibold text-white mb-8 text-center mt-10">
          Tic-Tac-Toe
        </h1>
        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold text-green-400 animate-bounce"
              : "text-xl text-white"
          }`}
        >
          {getGameStatus()}
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              className={`h-32 w-full text-6xl bg-gray-800 rounded-mg font-light transition-colors duration-200
                hover:bg-gray-700 ${
                  square === "x" ? "text-white" : "text-slate-400"
                }`}
            >
              {square}
            </button>
          ))}
        </div>
        <button
          className="w-full py-3 text-lg border text-white rounded-xl hover:bg-gray-50 hover:text-gray-800
      transition-color duration-200"
          onClick={reset}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
