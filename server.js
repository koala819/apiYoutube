const express = require("express");
const axios = require("axios");
const {google} = require("googleapis");

const app = express();
const port = 3000;
const apiKey = "AIzaSyCsfBmbTeLJGkkkv90-QivteF8PQ7pytqY";
const apiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
});

app.get("/search-with-googleapis", async (req, res) => {
try {
        const response = await youtube.videos.list({
            part: ["snippet","statistics"],
            chart: "mostPopular",
            regionCode: "GB",
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
