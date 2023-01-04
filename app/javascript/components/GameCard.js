import React, { useEffect, useState } from "react";

function GameCard(props) {
  const [gameId, gameName, gameImage, gameRelease, gameSlug] = [
    props.gameId,
    props.gameName,
    props.gameImage,
    props.gameRelease.slice(0, 4),
    props.gameSlug,
  ];

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    getGame();
  }, []);

  const handleAddClick = () => {
    prepareGamePackage();
  };

  const handleDeleteClick = () => {
    deleteFromRails();
  };

  const getGame = () => {
    console.log("Getting game");
    fetch(`/json_index?rawg_id=${gameId}`)
      .then((res) => res.json())
      .then((data) =>
        data.length > 0 ? setIsAdded(data[0]) : setIsAdded(false)
      )
      .catch((err) => console.log(err));
  };

  const prepareGamePackage = () => {
    const game = {
      name: gameName,
      cover_url: gameImage,
      rawg_id: gameId,
      year: gameRelease,
      slug: gameSlug,
    };
    postToRails(game);
  };

  const postToRails = (game) => {
    console.log(JSON.stringify(game));
    fetch("/games", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(game),
    })
      .then((res) => res.json())
      .then((data) => getGame())
      .catch((err) => console.log(err));
  };

  const deleteFromRails = () => {
    fetch(`/games/${isAdded.id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((data) => console.log("deleted"))
      .then((data) => getGame())
      .catch((err) => console.log(err));
  };

  const AddGame = () => {
    return (
      <button
        onClick={handleAddClick}
        className="inline-block bg-green-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        +
      </button>
    );
  };

  const RemoveGame = () => {
    return (
      <span
        onClick={handleDeleteClick}
        className="inline-block bg-red-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        -
      </span>
    );
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
        {isAdded ? <RemoveGame /> : <AddGame />}
      </div>
    </div>
  );
}

export default GameCard;
