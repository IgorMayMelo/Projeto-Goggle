import axios from "axios";
import { useState } from "react";
import noodles from "../assets/noodles.svg"

const Search = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = '7850b5fe50ecb4e9311b370b7e6cf12a99a2babe305b22c2e2ba47e7848b6201'

  const handleSubmit = async (e) => {
    e.preventDeault();
    if (!query){
      return;
    }
    setLoading(true);
    const URL = 'https://serpapi.com/search.json'
    try {

      const res = await axios.get(URL, {
        params :{
          q : query,
          engine : 'google',
          google_domain : 'google.com.br',
          api_key : API_KEY,
          hl : 'pt-br',
          gl : 'br',
          num : 10,
        },
      })
      const data = res.json();
      setResults(data);
    } 
    catch (err) {
      console.error(err)
      setError("Ocorreu um erro ao fazer a busca");
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="App">
      <div className="Logo">
        <h1>Noodle</h1>
        <img src={noodles} alt="noodles" />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Pesquisar" onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      <div>
        <ul>
          {error ? (<h4>{error}</h4>) :
          loading ? (<h4>Espere enquanto carrega</h4>) :

          results.map((item, index) => {
            return (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
              <p>{item.snippet}</p>
            </li>)
          })}
        </ul>
      </div>
    </div>
  );
};

export default Search