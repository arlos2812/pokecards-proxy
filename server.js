import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

/* ===== SETS / EXPANSIONES ===== */
app.get("/api/sets", async (req, res) => {
  try {
    const r = await fetch("https://api.pokemontcg.io/v2/sets");
    const j = await r.json();
    res.json(j);
  } catch {
    res.status(500).json({ error: "Error cargando sets" });
  }
});

/* ===== CARTAS POR SET ===== */
app.get("/api/cards", async (req, res) => {
  const { set } = req.query;
  if (!set) return res.status(400).json({ error: "Falta set" });

  try {
    const r = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${set}`
    );
    const j = await r.json();
    res.json(j);
  } catch {
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});
