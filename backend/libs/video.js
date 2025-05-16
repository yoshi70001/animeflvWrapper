import { load } from "cheerio";

async function getVideos(slug, episode) {
  try {
    const url = `https://www3.animeflv.net/ver/${slug}-${episode}`; // Reemplaza con la URL real

    // Descargar el HTML de la página usando fetch
    const response = await fetch(url);
    const data = await response.text();

    // Cargar el HTML en cheerio
    const $ = load(data);

    // Buscar y extraer el contenido del script
    const scriptContent = $("script")
      .get()
      .map((s) => $(s).html())
      .find((s) => s.includes("var videos"));

    if (scriptContent) {
      // Extraer el objeto videos usando expresiones regulares
      const videosMatch = scriptContent.match(/var videos = (\{[\s\S]*?\});/);

      if (videosMatch) {
        // Evaluar el JSON extraído de forma segura
        const videos = JSON.parse(videosMatch[1] ?? {}).SUB.filter(
          (e) => e.ads == 0
        );
        // console.log("Videos:", videos);
        return videos;
      } else {
        console.log("No se encontró el objeto videos.");
      }
    } else {
      console.log("No se encontró el script requerido.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export { getVideos };
