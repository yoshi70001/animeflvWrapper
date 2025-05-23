import { load } from "cheerio";
const getAnimes = async (animeName) => {
  const t = await fetch("https://www3.animeflv.net/api/animes/search", {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language":
        "es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5,es-PE;q=0.4",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://www3.animeflv.net/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `value=${animeName.replace(" ", "+")}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  const listSlugs = await t.json();
  listSlugs.forEach((e) => {
    e.banner = `https://animeflv.net/uploads/animes/covers/${e.id}.jpg`;
  });
  // console.log(listSlugs);
  return listSlugs;
};
const getLast = async () => {
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
      anime.image =
        "https://animeflv.net" +
        $(element).find("img").attr("src").replace("/thumbs/", "/covers/");
      anime.slug = slug.join("-");
      anime.episodio = $(element).find(".Capi").text().trim() || "N/A";
      return anime;
    })
    .get();
  return animes;
};
export { getAnimes, getLast };
