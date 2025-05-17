import { load } from "cheerio";
const t = await fetch("https://www3.animeflv.net/");
const tt = await t.text();
const $ = load(tt);

const listAnimes = $("ul.ListEpisodios.AX");

const animes = listAnimes
  .children()
  .map((_, element) => {
    const anime = {};
    const slug = $(element)
      .find("a")
      .attr("href")
      .replace("/ver/", "")
      .split("-");
    slug.pop();
    anime.title = $(element).find("strong.Title").text().trim();
    anime.image = "https://animeflv.net" + $(element).find("img").attr("src");
    anime.slug = slug.join("-");
    anime.episodio = $(element).find(".Capi").text().trim() || "N/A";
    return anime;
  })
  .get();
