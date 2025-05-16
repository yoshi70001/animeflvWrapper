import express from "express";
import { getAnimes, getLast } from "./libs/anime.js";
import { getVideos } from "./libs/video.js";
import { getEpisodes } from "./libs/episode.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const last = await getLast();
  res.render("index", { last: last });
});
app.get("/anime", async (req, res) => {
  const episodes = await getEpisodes(req.query?.slug);
  // console.log({
  //   episodes: episodes.map((e) => {
  //     return { nro: e[0], id: e[1] };
  //   }),
  //   slug: req.query?.slug,
  //   image: req.query?.image,
  //   title: req.query?.title,
  // });
  res.render("anime", {
    episodes: episodes.map((e) => {
      return { nro: e[0], id: e[1] };
    }),
    slug: req.query?.slug,
    image: req.query?.image,
    title: req.query?.title,
  });
});
app.get("/query/:animequery", async (req, res) => {
  const anime = req.params.animequery;
  const animes = await getAnimes(anime);
  res.json(animes);
});

app.get("/episode/:animeslug", async (req, res) => {
  const slug = req.params.animeslug;
  const episodes = await getEpisodes(slug);
  res.json(episodes);
});

app.get("/video/:animeslug/:id", async (req, res) => {
  const slug = req.params.animeslug;
  const id = req.params.id;
  const videos = await getVideos(slug, id);
  res.json(videos);
});

app.listen(port, () => {
  console.log("listen to " + port);
});
