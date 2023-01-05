import React, { useContext, useEffect, useState } from "react";

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

  function handleChange(event) {
    props.onChange(event);
    console.log("Je fonctionne Gamecard");
  }

  useEffect(() => {
    getGame();
  }, []);

  // I did not manage to make one single handle click function for all the buttons

  const handleAddClick = () => {
    postToRails();
  };

  const handleDeleteClick = () => {
    deleteFromRails();
    setChanges(!Changes);
  };

  const handlePlayingClick = () => {
    updateRailsStatus("playing");
  };

  const handlePausedClick = () => {
    updateRailsStatus("paused");
  };

  const handleCompletedClick = () => {
    if (isAdded.status === "completed") {
      return;
    } else {
      updateRailsStatus("completed");
    }
  };

  const handleStoppedClick = () => {
    updateRailsStatus("stopped");
  };

  const getGame = () => {
    fetch(`/json_index?rawg_id=${parseInt(gameId)}`)
      .then((res) => res.json())
      .then((data) =>
        data.length > 0 ? setIsAdded(data[0]) : setIsAdded(false)
      )
      .then((data) => console.log(isAdded))
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

  const updateRailsStatus = (status) => {
    console.log(status);
    fetch(`/games/${isAdded.id}`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: status }),
    })
      .then((data) => console.log("updated"))
      .then((data) => getGame())
      .catch((err) => console.log(err));
  };

  const AddGame = () => {
    return (
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {gameRelease}
        </span>
        <button
          onClick={handleAddClick}
          className="bg-blue-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  };

  const RemoveGame = () => {
    return (
      <div
        onClick={handleChange}
        className="px-6 pt-4 pb-2 flex justify-between"
      >
        {isAdded.status === "playing" || isAdded.status === "completed" ? (
          <Completed />
        ) : (
          <Playing />
        )}
        {isAdded.status === "completed" || isAdded.status === "paused" ? (
          <span></span>
        ) : (
          <Paused />
        )}
        {isAdded.status === "completed" || isAdded.status === "stopped" ? (
          <span></span>
        ) : (
          <Stopped />
        )}
        <button
          onClick={handleDeleteClick}
          className="bg-blue-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
        >
          <i className="fas fa-minus"></i>
        </button>
      </div>
    );
  };

  const Completed = () => {
    return (
      <button
        onClick={handleCompletedClick}
        className="bg-yellow-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        <i className="fas fa-trophy"></i>
      </button>
    );
  };

  const Playing = () => {
    return (
      <button
        onClick={handlePlayingClick}
        className="bg-green-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        <i className="fas fa-play"></i>
      </button>
    );
  };

  const Paused = () => {
    return (
      <button
        onClick={handlePausedClick}
        className="bg-orange-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        <i className="fas fa-pause"></i>
      </button>
    );
  };

  const Stopped = () => {
    return (
      <button
        onClick={handleStoppedClick}
        className="bg-red-400 px-3 py-1 rounded-full text-sm font-semibold text-white mb-2"
      >
        <i className="fas fa-stop"></i>
      </button>
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
        {isAdded ? <RemoveGame /> : <AddGame />}
      </div>
    </div>
  );
}

export default GameCard;
