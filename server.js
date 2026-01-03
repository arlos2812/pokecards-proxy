import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "169f9e8c-d888-4399-a8a0-3e60572e8389";
const HEADERS = { "X-Api-Key": API_KEY };

app.get("/api/sets", async (req, res) => {
  try {
    const r = await fetch("https://api.pokemontcg.io/v2/sets", { headers: HEADERS });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Sets error" });
  }
});

app.get("/api/cards", async (req, res) => {
  const { set } = req.query;
  try {
    const r = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${set}&pageSize=250`,
      { headers: HEADERS }
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Cards error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy listo en puerto", PORT));
