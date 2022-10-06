require('dotenv').config();
const { google } = require('googleapis');
const {response} = require("express");

/*google.youtube('v3').videos.list({
    key: process.env.YOUTUBE_TOKEN,
    part: ['statistics'],
    id: '8vAdAxgX2FM'
}).then((response) => {
    const {data} = response;
    data.items.forEach((item) => {
       for (const eachSnippet of Object.entries(item)) {
            console.log(eachSnippet);
        };
       /!*data.items.forEach((item) => {
            for (const eachThumbnail of Object.entries(item.snippet.thumbnails.default)) {
                console.log("thumbnails",eachThumbnail);
            };
        })*!/
        /!*data.items.forEach((item) => {
           console.log(`content_rating_cnc_rating: ${item.contentRating.contentRating.cncRating}\n `);
       })*!/

    })
}).catch((err) => console.log(err))*/

google.youtube('v3').channels.list({
    key: process.env.YOUTUBE_TOKEN,
    //part: ['snippet','contentDetails','statistics','topicDetails','status','brandingSettings','auditDetails','contentOwnerDetails','localizations'],
    part: ['statistics'],
    id: 'UCOVAQ6qqaZGsZ6A5XAcFIZg'
}).then((response) => {
    const {data} = response;
    data.items.forEach((item) => {
        for (const eachItem of Object.entries(item)) {
            console.log("localizations",eachItem);
        }
        ;
        data.items.forEach((item) => {
            console.log(`localizations: ${item.localizations}\n `);

        })
    });
}).catch((err) => console.log(err))
