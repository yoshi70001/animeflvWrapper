import { load } from "cheerio";

const getLast = async () => {
  const t = await fetch("https://www3.animeflv.net/");
  const tt = await t.text();
  const $ = load(tt);
  const animes = [];

  $("ul.ListAnimes li").each((_, element) => {
    const anime = {};

    anime.title = $(element).find("h3.Title").text().trim();
    anime.image =
      "https://animeflv.net" + $(element).find("figure img").attr("src");
    anime.slug = $(element).find("a").attr("href").replace("/anime/", "");
    anime.rating = $(element).find(".Vts.fa-star").text().trim() || "N/A";
    anime.description =
      $(element).find(".Description p").last().text().trim() ||
      "Sin descripción";

    animes.push(anime);
  });
  return animes;
};
export { getLast };
