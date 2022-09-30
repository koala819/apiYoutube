require('dotenv').config();
const { google } = require('googleapis');
const {response} = require("express");

google.youtube('v3').videos.list({
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    id: 'Ppf2NROT-t8'
}).then((response) => {
    const {data} = response;
    data.items.forEach((item) => {
        console.log(`Title: ${item.snippet.title}\n Description: ${item.snippet.description}\n`);
    })
}).catch((err) => console.log(err))