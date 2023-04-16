const express = require('express');
const path = require('path');
const Campground = require('./models/campground');
const ejsMate = require('ejs-mate');
const { campgroundSchema } = require('./schemas.js');
const { reviewSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/expressError');
const Joi = require('joi');
const methodOverride = require('method-override');
const Review = require('./models/review');
const mongoose = require('mongoose');

const campgrounds = require('./routes/campgrounds');

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

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

/* parser */
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));


/* Middleware for review */
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.use('/campgrounds', campgrounds)

app.get('/', (req, res) => {
    res.render('home')
})

/* Find a specific campground to leave a review for */
app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

/* $pull will remove the reference to the review in the campground and the review itself */
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))


/* This must go at bottom in order to let everything else run first */
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Uh oh something went wrong';
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
