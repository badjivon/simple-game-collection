import React from "react";
import GameCard from "./GameCard";

function GameSearch(props) {
  const games = props.tenGames;
  return (
    <GameCard
      gameName={games.name}
      gameImage={games.background_image}
      gameRelease={games.released}
    />
  );
}

export default GameSearch;
