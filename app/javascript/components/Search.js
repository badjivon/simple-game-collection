import React, { useEffect, useState } from "react";
import GameSearch from "./GameSearch";

function Search(props) {
  const [searchInput, setSearchInput] = useState("");
  const [gameData, setGameData] = useState([]);
  const number_of_elements = 20;

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const getRawgGames = (searchInput) => {
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${searchInput}&page=1&page_size=${number_of_elements}&ordering=-metacritic`
    )
      .then((res) => res.json())
      .then((data) => setGameData(data.results))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getRawgGames(searchInput);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-full"
      >
        <input
          value={searchInput}
          onChange={handleChange}
          className="border border-gray-400 rounded-lg p-2 w-1/2 mb-6"
          type="text"
          placeholder="Search"
        />
      </form>
      <div className="grid grid-cols-5 gap-4 grid-flow-row">
        {gameData.map((game) => {
          return (
            <div key={game.id}>
              <div>
                <GameSearch tenGames={game} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
