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



/* Code That Did Work */
const seedDB = async () => {
    try {
        await Campground.deleteMany({});
        console.log("Deleted all campgrounds");
        for (let i = 0; i < 50; i++){
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10
            const camp = new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                image: 'https://source.unsplash.com/collection/483251',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolorum deserunt totam delectus quos tenetur sapiente quaerat autem blanditiis, iusto ea! Eligendi expedita facere veniam dignissimos deleniti beatae dolores ullam!',
                price
            });
            console.log(camp); // log the camp object being saved
            await camp.save();
        }
    } catch (err) {
        console.error(err); // log any errors that occur
    }
}

// Execute the above function
seedDB();

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


/* seedDB().then(() => {
    mongoose.connection.close();
}) */
