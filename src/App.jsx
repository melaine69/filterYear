import { useState, useEffect } from "react"
import Header from "../Header"

export default function App() {
  const [films, setFilms] = useState([])

  const [filterYear, setFilterYear] = useState()
  const [searchTerm, setSearchTerm] = useState("cat")

  useEffect(() => {
    // si 2eme parametre de useEffect est vide, le callback est lancé une seule fois
    // si 2eme param contient des states, le callback est relancé si un de ces states change

    console.log("je suis chargé")

    fetch(`http://www.omdbapi.com/?apikey=29d469d9&s=${searchTerm || "cat"}`)
      .then((response) => response.json())
      .then((json) => setFilms(json))

  }, [searchTerm])

  return (
    <>
      <div className="flex justify-center p-10 text-2xl font-semibold">
        <Header />
      </div>

      <div className="mx-auto px-5 py-10 max-w-7xl bg-pink-100 rounded-xl">
        <ul className="mb-4 columns-2">
          {films.Search?.map(o => o.Year)?.map(year => (
            <li key={year}>
              <button onClick={() => setFilterYear(year)}>{year}</button>
            </li>
          ))}
        </ul>
        {`year: ${filterYear || "non défini"}`}
        {/* {filterFilm && <button onClick={() => setFilterFilm()}>Réinitialiser</button>} */}
        <input className="mb-6 px-3 py-2 w-full border" type="text" placeholder="Rechercher"
          onChange={event => setSearchTerm(event.target.value)} />
        <div className="grid grid-cols-4 gap-6">
          {/* {JSON.stringify(films.Search)} */}
          {films
            .Search
            ?.filter(film => !filterYear || film.Year === filterYear)
            ?.map((film) => (
              <div className="flex flex-col gap-2 p-2 border" key={film.Id}>
                <img src={film.Poster} alt={film.Title} />
                <p>{film.Genre}</p>
                <p>{film.Title}</p>
              </div>
            ))}
        </div>
      </div>
    </>

  )
}

//on récupère les données de l'api




