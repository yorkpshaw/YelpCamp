/* Connect to Mongoose Using Your Models */
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

/* Code That Did Not Work */
/* const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
} */

/* Code That Did Work */
const seedDB = async () => {
    try {
        await Campground.deleteMany({});
        console.log("Deleted all campgrounds");
        for (let i = 0; i < 50; i++){
            const random1000 = Math.floor(Math.random() * 1000);
            const camp = new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`
            });
            console.log(camp); // log the camp object being saved
            await camp.save();
        }
    } catch (err) {
        console.error(err); // log any errors that occur
    }
}

/* seedDB().then(() => {
    mongoose.connection.close();
}) */

// Execute the above function
seedDB();