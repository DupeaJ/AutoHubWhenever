// test.js

const { fetchCarData } = require('./apiHELper'); // Import our function

// Test our function
fetchCarData('camry', function(error, response, body) {
    if(error) {
        console.error('Request failed:', error);
    } else if(response.statusCode !== 200) {
        console.error('Error:', response.statusCode, body);
    } else {
        console.log('Data received:', body);
    }
});
