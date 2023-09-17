const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

// Set up the YouTube API
const youtube = google.youtube('v3');
const youtubeApiKey = process.env.YOUTUBE_API_KEY; // Use your API key

// Handle YouTube search route
router.get('/search', async (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the URL query parameter

    try {
        // Implement your YouTube search logic here using the YouTube API key
        const youtubeResults = await searchYouTube(searchQuery);
        res.render('search_results', { results: youtubeResults });
    } catch (error) {
        console.error('Error searching YouTube:', error);
        res.status(500).send('Error searching YouTube.');
    }
});

// Implement the searchYouTube function using your YouTube API key
async function searchYouTube(query) {
    try {
        const response = await youtube.search.list({
            auth: youtubeApiKey, // Use your YouTube API key
            part: 'snippet',
            q: query,
            maxResults: 10, // Adjust as needed
        });

        const items = response.data.items;
        return items;
    } catch (error) {
        console.error('Error searching YouTube:', error);
        return [];
    }
}

module.exports = router;
