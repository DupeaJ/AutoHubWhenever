// apiHelper.js

const request = require('request');
require('dotenv').config(); // Load environment variables from .env file

function fetchCarData(model, callback) {
    request.get({
        url: 'https://api.api-ninjas.com/v1/cars?model=' + model,
        headers: {
            'X-Api-Key': process.env.API_KEY // This reads the API_KEY from the .env file
        },
    }, callback);
}


module.exports = { fetchCarData };
