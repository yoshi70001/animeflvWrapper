import express from "express";
import { getAnimes } from "./libs/search.js";
import { getVideos } from "./libs/videos.js";
import { getEpisodes } from "./libs/episodes.js";
import { getLast } from "./libs/index.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  const last = await getLast();
  console.log(last);
  res.render("index", { last: last });
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

app.get("/episode/:animeslug/:id", async (req, res) => {
  const slug = req.params.animeslug;
  const id = req.params.id;
  const videos = await getVideos(slug, id);
  res.json(videos);
});

app.listen(port, () => {
  console.log("listen to " + port);
});
