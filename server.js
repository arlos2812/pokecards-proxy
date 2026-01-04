import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_BASE = "https://api.pokemontcg.io/v2";

// 🔹 TEST
app.get("/", (req, res) => {
  res.send("Proxy Pokémon activo");
});

// 🔹 SETS / EXPANSIONES
app.get("/sets", async (req, res) => {
  try {
    const r = await fetch(`${API_BASE}/sets`);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error cargando sets" });
  }
});

// 🔹 CARTAS POR SET
app.get("/cards", async (req, res) => {
  const set = req.query.set;
  if (!set) return res.status(400).json({ error: "Falta set" });

  try {
    const r = await fetch(`${API_BASE}/cards?q=set.id:${set}`);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});
