const db = require("../config/database");

// sophia: update urls 
const videodata = [
    {
        title: "How to Change your Oil in less than 5 mins",
        url: "https://www.youtube.com/watch?v=rYWcL76WMRg",
    },
    {
        title: "How to change a tire",
        url: "https://www.youtube.com/embed/0KDMdYww4VE?si=mYrX_PDvxZx5gt2y",
    },
    {
        title: "How to jumpstart a car",
        url: "https://www.youtube.com/embed/hyLwfthYjKw?si=ovMd7NWkLdkzR2eK",
    },
    {
        title: "How to drive a manual transmission in 1 minute",
        url: "https://www.youtube.com/embed/UsOcXG2v3EE?si=PP9ppfwZaNyYthze",
    },
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