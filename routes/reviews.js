const express = require('express');
/* mergeParams will merge all params between app/review */
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');


/* Find a specific campground to leave a review for */
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

/* $pull will remove the reference to the review in the campground and the review itself */
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
