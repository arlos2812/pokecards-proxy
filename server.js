import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

const API_KEY = "169f9e8c-d888-4399-a8a0-3e60572e8389";

app.get("/api/sets", async (req, res) => {
  try {
    const r = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: { "X-Api-Key": API_KEY }
    });
    const j = await r.json();
    res.json(j.data);
  } catch (e) {
    console.error(e);
    res.status(500).json([]);
  }
});

app.get("/api/cards", async (req, res) => {
  try {
    const { setId, page = 1 } = req.query;
    const url = `https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&page=${page}&pageSize=250`;
    const r = await fetch(url, {
      headers: { "X-Api-Key": API_KEY }
    });
    const j = await r.json();
    res.json(j.data || []);
  } catch (e) {
    console.error(e);
    res.status(500).json([]);
  }
});

app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});
