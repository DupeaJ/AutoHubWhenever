const db = require("../config/database");

// sophia: update urls 
// JAWSDB: need to create video table; source schema.sql 
const videodata = [
    {
    title: "How to Change your Oil in less than 5 mins", 
    url: "https://www.youtube.com/watch?v=rYWcL76WMRg",
    },
    {
    title: "How to change a tire", 
    url:"https://www.youtube.com/watch?v=0KDMdYww4VE",
    },
    {
    title: "How to jumpstart a car", 
    url: "https://www.youtube.com/watch?v=hyLwfthYjKw",
    },
    {
    title: "How to drive a manual transmission in 1 minute", 
    url: "https://www.youtube.com/watch?v=UsOcXG2v3EE",
    }
];

const videoGallery = () => { 
    const data = videodata.map(video => ([
        video.title,
        video.url
    ]))
    console.log(data);
    db.query("INSERT INTO videos (title,url) VALUES ?", [data], function (err, results) {
        if (err) throw err;
        console.log(results);
    })
};

module.exports = videoGallery; 