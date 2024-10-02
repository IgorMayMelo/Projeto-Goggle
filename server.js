import express from "express";
import cors from "cors";
import axios from "axios";
const PORT = 4000;
const app = express();

app.use(cors());

app.get("/search", async (req, res) => {
  const { query } = req;

  const API_KEY =
    "7850b5fe50ecb4e9311b370b7e6cf12a99a2babe305b22c2e2ba47e7848b6201";
    const URL = "https://serpapi.com/search.json";
    try {
      const response = await axios.get(URL, {
        params: {
          q: query,
          engine: "google",
          google_domain: "google.com.br",
          api_key: API_KEY,
          hl: "pt-br",
          gl: "br",
          num: 10,
        },
      });
      res.json(response.data);
    } catch (err) {
        res.status(500).json({error: "Erro ao fazer a requisição à API"})
    }});

app.listen(PORT, () => {
  console.log(`O proxy está rodando na porta ${PORT}`);
});
