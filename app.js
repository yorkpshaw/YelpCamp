const express = require('express');
const path = require('path');
const Campground = require('./models/campground');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, <--- Causes app to crash now
    useUnifiedTopology: true
});

const db = mongoose.connection;
// Assigned to db so you don't have to keep typing mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

/* parser */
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    // Get the campground data, what you do with it is in the ejs file
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

/* Place this before show, or it gets mistake as :id */
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

/* Must parse the req body to view post */
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id) // Node.js object that allows you to access the value of a URL parameter
    res.render('campgrounds/show', { campground })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
