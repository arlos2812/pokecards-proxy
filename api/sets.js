export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: {
        "X-Api-Key": "0ff3e61a-b7b9-4106-8a7e-09f52033f9fd",
        "User-Agent": "PokeCards-App",
        "Accept": "application/json"
      }
    });

    const data = await response.json();

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
