import "./App.css";
import { useContext, useEffect } from "react";
import { SeriesData } from "./context/SeriesDataContext";

function App() {
  const { state, dispatch } = useContext(SeriesData);

  const fetchData = async () => {
    const data = await fetch(
      "https://api.tvmaze.com/singlesearch/shows?q=interest&embed=episodes"
    );
    const dataJSON = await data.json();

    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes,
    });
  };

  useEffect(() => {
    state.episodes.length === 0 && fetchData();
  });

  return (
    <div className="App">
      <h1>Person of Interest</h1>
      <p>List of Episodes</p>
      <section>
        {state.episodes.map((episode) => {
          return (
            <section key={episode.id}>
              <img
                src={episode.image.medium}
                alt={`Person of Interest episode ${episode.name}`}
              />
              <h5>{episode.name}</h5>
              <section>
                <div>
                  Season: {episode.season}, Number: {episode.number}
                </div>
              </section>
            </section>
          );
        })}
      </section>
    </div>
  );
}

export default App;
