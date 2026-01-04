const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;
const API_KEY = "169f9e8c-d888-4399-a8a0-3e60572e8389";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/sets", async (req, res) => {
  try {
    const r = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: { "X-Api-Key": API_KEY }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Sets error" });
  }
});

app.get("/api/cards/:setId", async (req, res) => {
  try {
    const r = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${req.params.setId}&pageSize=250`,
      { headers: { "X-Api-Key": API_KEY } }
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Cards error" });
  }
});

app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});

app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});
