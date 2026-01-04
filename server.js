import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "169f9e8c-d888-4399-a8a0-3e60572e8389";
const BASE_URL = "https://api.pokemontcg.io/v2";

// 👉 EXPANSIONES
app.get("/api/sets", async (req, res) => {
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

// 👉 CARTAS POR SET
app.get("/api/cards", async (req, res) => {
  const setId = req.query.set;

  if (!setId) {
    return res.status(400).json({ error: "Falta set" });
  }

  try {
    const r = await fetch(
      `${BASE_URL}/cards?q=set.id:${setId}&pageSize=250`,
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
