export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: {
        "X-Api-Key": "0ff3e61a-b7b9-4106-8a7e-09f52033f9fd",
        "Accept": "application/json",
        "User-Agent": "PokeCards-App"
      }
    });

    const text = await response.text();

    // Si la API devuelve error (HTML, 403, etc)
    if (!response.ok) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(response.status).json({
        error: "Pokémon TCG API error",
        status: response.status,
        response: text.slice(0, 300) // solo un trozo para debug
      });
      return;
    }

    // Si todo va bien, convertir a JSON
    const data = JSON.parse(text);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({
      error: "Proxy error",
      detail: error.message
    });
  }
}
