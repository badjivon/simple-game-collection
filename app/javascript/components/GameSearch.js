import React from "react";
import GameCard from "./GameCard";

function GameSearch(props) {
  const games = props.tenGames;
  return (
    <GameCard
      gameName={games.name}
      gameImage={games.background_image}
      gameRelease={games.released}
      gameSlug={games.slug}
      gameId={games.id}
    />
  );
}

export default GameSearch;
