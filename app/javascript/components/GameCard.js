import React from "react";

function GameCard(props) {
  const gameName = props.gameName;
  const gameImage = props.gameImage;
  const gameRelease = props.gameRelease;

  const handleClick = (event) => {
    console.log("clicked");
  };

  return (
    <div className="max-w-sm max-h-sm rounded overflow-hidden shadow-lg m-2 bg-white">
      <img className="w-full" src={gameImage} alt={gameName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{gameName}</div>
        {/* <p className="text-gray-700 text-base">{gameName} is a game.</p> */}
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {gameRelease}
        </span>
        <span
          onClick={handleClick}
          className="inline-block bg-green-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
        >
          +
        </span>
      </div>
    </div>
  );
}

export default GameCard;
