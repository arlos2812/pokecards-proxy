import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_BASE = "https://api.pokemontcg.io/v2";
const API_KEY = ""; // opcional, puedes dejarlo vacío

const headers = API_KEY
  ? { "X-Api-Key": API_KEY }
  : {};

app.get("/", (req, res) => {
  res.send("PokeCards Proxy OK");
});

/* 🔹 SETS */
app.get("/api/sets", async (req, res) => {
  try {
    const r = await fetch(`${API_BASE}/sets`, { headers });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error cargando sets" });
  }
});

/* 🔹 CARDS */
app.get("/api/cards", async (req, res) => {
  const setId = req.query.set;

  if (!setId) {
    return res.status(400).json({ error: "Falta set" });
  }

  try {
    const r = await fetch(
      `${API_BASE}/cards?q=set.id:${setId}&pageSize=250`,
      { headers }
    );
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log("Proxy activo en puerto", PORT)
);
