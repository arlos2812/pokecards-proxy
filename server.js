import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = process.env.POKEMON_API_KEY;
const BASE_URL = "https://api.pokemontcg.io/v2";

/* ---------- ROOT ---------- */
app.get("/", (req, res) => {
  res.send("Proxy Pokemon activo");
});

/* ---------- SETS ---------- */
app.get("/sets", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/sets`, {
      headers: {
        "X-Api-Key": API_KEY
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error cargando sets" });
  }
});

/* ---------- CARDS ---------- */
app.get("/cards", async (req, res) => {
  const set = req.query.set;

  if (!set) {
    return res.status(400).json({ error: "Falta set" });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/cards?q=set.id:${set}&pageSize=250`,
      {
        headers: {
          "X-Api-Key": API_KEY
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

/* ---------- PORT ---------- */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Proxy activo en puerto " + PORT);
});
