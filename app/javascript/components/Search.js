import React, { useEffect, useState } from "react";

function Search(props) {
  const [searchInput, setSearchInput] = useState("");
  const [gameData, setGameData] = useState([]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  function DisplayGame(props) {
    const games = props.tenGames;
    return <p>{games.name}</p>;
  }

  const getRawgGames = (searchInput) => {
    fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${searchInput}&page=1&page_size=10`
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
        className="flex items-center justify-center"
      >
        <input
          value={searchInput}
          onChange={handleChange}
          className="border border-gray-400 rounded-lg p-2"
          type="text"
          placeholder="Search"
        />
      </form>
      {gameData.map((game) => {
        return (
          <div key={game.id}>
            <DisplayGame tenGames={game} />
          </div>
        );
      })}
    </div>
  );
}

export default Search;
