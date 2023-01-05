import React from "react";
import GameCard from "./GameCard";

function GameLibrary(props) {
  const games = props.tenGames;
  return (
    <GameCard
      changes={props.changes}
      onChange={props.onChange}
      gameName={games.name}
      gameImage={games.cover_url}
      gameRelease={games.year}
      gameSlug={games.slug}
      gameId={games.rawg_id}
    />
  );
}

export default GameLibrary;
