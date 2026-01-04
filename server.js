import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = process.env.POKEMON_API_KEY;
const BASE_URL = "https://api.pokemontcg.io/v2";

if (!API_KEY) {
  console.error("❌ FALTA POKEMON_API_KEY");
}

app.get("/", (req, res) => {
  res.send("Proxy Pokémon activo");
});

app.get("/sets", async (req, res) => {
  try {
    const r = await fetch(`${BASE_URL}/sets`, {
      headers: { "X-Api-Key": API_KEY }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error cargando sets" });
  }
});

app.get("/cards", async (req, res) => {
  const { set } = req.query;
  if (!set) {
    return res.status(400).json({ error: "Falta set" });
  }

  try {
    const r = await fetch(
      `${BASE_URL}/cards?q=set.id:${set}`,
      { headers: { "X-Api-Key": API_KEY } }
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});
