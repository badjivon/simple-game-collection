import React, { useEffect, useState } from "react";

function GameCard(props) {
  const gameRelease =
    props.gameRelease === null ? "N/A" : props.gameRelease.slice(0, 4);

  const [gameId, gameName, gameImage, gameSlug] = [
    props.gameId,
    props.gameName,
    props.gameImage,
    props.gameSlug,
  ];

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    getGame();
  }, []);

  const handleAddClick = () => {
    postToRails();
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

  const postToRails = () => {
    const game = {
      name: gameName,
      cover_url: gameImage,
      rawg_id: gameId,
      year: gameRelease,
      slug: gameSlug,
    };
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
        className="bg-green-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        <i className="fas fa-plus"></i>
      </button>
    );
  };

  const RemoveGame = () => {
    return (
      <span
        onClick={handleDeleteClick}
        className="bg-red-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        <i className="fas fa-minus"></i>
      </span>
    );
  };

  return (
    <div className="h-96 overflow-hidden rounded shadow-lg m-2 bg-white">
      <div
        className="bg-cover h-48"
        style={{ backgroundImage: `url(${gameImage})` }}
        alt={gameName}
      />
      <div className="flex flex-col justify-between h-48">
        <div className="px-6 py-4">
          <div className="font-bold h-24 text-lg mb-2 text-ellipsis">
            {gameName}
          </div>
          {/* <p className="text-gray-700 text-base">{gameName} is a game.</p> */}
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {gameRelease}
          </span>
          {isAdded ? <RemoveGame /> : <AddGame />}
        </div>
      </div>
    </div>
  );
}

export default GameCard;
