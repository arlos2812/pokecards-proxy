import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;
const API_KEY = process.env.POKEMON_API_KEY;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "Proxy Pokémon activo" });
});

app.get("/sets", async (req, res) => {
  try {
    const r = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: { "X-Api-Key": API_KEY }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error cargando sets" });
  }
});

app.get("/cards", async (req, res) => {
  const { set } = req.query;
  if (!set) return res.status(400).json({ error: "Falta set" });

  try {
    const r = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${set}`,
      { headers: { "X-Api-Key": API_KEY } }
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});
