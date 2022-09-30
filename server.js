const express = require("express");
const axios = require("axios");
const {google} = require("googleapis");

const app = express();
const port = 3000;
const apiKey = "AIzaSyDgk2ql0rVQ5EE6Ayr_I8UlPTRtli26KY8";
const apiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/search", async (req, res, next) => {
    try {
        const searchQuery = req.query.search_query;
        const url = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;

        const response = await axios.get(url);
        const titles = response.data.items.map((item) => item.snippet.title);

        res.send(titles);
    } catch (err) {
        next(err);
    }
});

app.get("/search-with-googleapis", async (req, res) => {
    try {
        const searchQuery = req.query.search_query;
        const response = await youtube.videos.list({
            part: ["snippet","statistics"],
            chart: "mostPopular",
            regionCode: "FR",
            q: searchQuery,
            maxResults: 2,
        });
        res.send(response.data.items.map((item) => {
            return {
                title: item.snippet.title,
                description: item.snippet.description,
                publishedAt: item.snippet.publishedAt,
                videoId: item.id.videoId,
                viewCount: item.statistics.viewCount,
            }}))
    } catch (err) {
        console.log ('error with API :: ', err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});