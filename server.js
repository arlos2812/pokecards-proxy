import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

// ===== SETS =====
app.get("/api/sets", async (req, res) => {
  try {
    const response = await fetch("https://api.pokemontcg.io/v2/sets");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error cargando sets" });
  }
});

// ===== CARTAS =====
app.get("/api/cards", async (req, res) => {
  const { set } = req.query;

  if (!set) {
    return res.status(400).json({ error: "Falta set" });
  }

  try {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${set}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy activo en puerto ${PORT}`);
});
