import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "169f9e8c-d888-4399-a8a0-3e60572e8389";
const BASE_URL = "https://api.pokemontcg.io/v2";

// ===== SETS =====
app.get("/api/sets", async (req, res) => {
  try {
    const r = await fetch(`${BASE_URL}/sets`, {
      headers: { "X-Api-Key": API_KEY }
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error("SETS ERROR:", err);
    res.status(500).json({ error: "Error cargando sets" });
  }

// ===== CARDS =====
app.get("/api/cards", async (req, res) => {
  try {
    const q = req.query.q;
    const page = req.query.page || 1;

    if (!q) {
      return res.json({ data: [] });
    }

    const url =
      `${BASE_URL}/cards?q=${encodeURIComponent(q)}` +
      `&page=${page}&pageSize=100`;

    const r = await fetch(url, {
      headers: { "X-Api-Key": API_KEY }
    });

    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error("CARDS ERROR:", err);
    res.status(500).json({ error: "Error cargando cartas" });
  }
});

// ⚠️ Render usa ESTE puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy activo en puerto", PORT);
});
