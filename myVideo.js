require('dotenv').config();
const { google } = require('googleapis');
const {response} = require("express");

google.youtube('v3').videos.list({
    key: process.env.YOUTUBE_TOKEN,
    part: ['snippet','statistics','contentDetails','status'],
    id: '8vAdAxgX2FM'
}).then((response) => {
    const {data} = response;
    data.items.forEach((item) => {
       for (const eachSnippet of Object.entries(item)) {
            console.log(eachSnippet);
        };
        data.items.forEach((item) => {
            console.log(`Tags: ${item.snippet.tags}\n defaultLanguage: ${item.snippet.defaultLanguage}\n`);
        })
    })
}).catch((err) => console.log(err))