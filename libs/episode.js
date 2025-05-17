import { load } from "cheerio";

async function getEpisodes(slug) {
  try {
    const url = `https://www3.animeflv.net/anime/${slug}`; // Reemplaza con la URL real
    // Descargar el HTML de la página usando fetch
    const response = await fetch(url);
    const data = await response.text();

    // Cargar el HTML en cheerio
    const $ = load(data);

    // Buscar y extraer el contenido del script
    const scriptContent = $("script")
      .get()
      .map((s) => $(s).html())
      .find((s) => s.includes("var episodes"));

    if (scriptContent) {
      const episodesMatch = scriptContent.match(
        /var episodes = (\[[\s\S]*?\]);/
      );

      if (episodesMatch) {
        const episodes = JSON.parse(episodesMatch[1]);

        return episodes.map((episode) => {
          return { nro: episode[0], id: episode[1] };
        });
      } else {
        console.log("No se encontró el array de episodes.");
        return [];
      }
    } else {
      console.log("No se encontró el script requerido.");
      return [];
    }
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

export { getEpisodes };
