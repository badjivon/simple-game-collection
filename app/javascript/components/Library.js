import React, { useEffect, useState, useContext, createContext } from "react";
import GameLibrary from "./GameLibrary";

function Library() {
  const [gameData, setGameData] = useState([]);
  const [Changes, setChanges] = useState();

  useEffect(() => {
    getRailsGames();
  }, [Changes]);

  function handleChange(newValue) {
    setChanges(newValue);
    console.log(newValue);
    console.log("Je fonctionne Library");
  }

  const getRailsGames = () => {
    fetch("/games", { headers: { Accept: "application/json" } })
      .then((res) => res.json())
      .then((data) => setGameData(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="grid grid-cols-5 gap-4 grid-flow-row">
      {gameData.map((game) => {
        return (
          <div key={game.id}>
            <div>
              <GameLibrary
                changes={Changes}
                onChange={handleChange}
                tenGames={game}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Library;
