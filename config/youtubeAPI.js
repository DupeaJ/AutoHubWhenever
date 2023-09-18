// services/youtubeAPI.js
const { google } = require('googleapis');
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
    version: 'v3',
    auth: youtubeApiKey,
});

async function searchYouTube(query) {
    try {
        const response = await youtube.search.list({
            part: 'snippet',
            q: query,
            type: 'video',
        });
        return response.data.items.map(item => item.snippet.title);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    searchYouTube,
};
