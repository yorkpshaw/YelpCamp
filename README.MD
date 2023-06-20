# YelpCamp

YelpCamp is a Yelp-style application for campgrounds. It allows users to post pictures, write reviews, and share the location of campgrounds.

Deployed Application: https://yelpcamp-sodx.onrender.com

## Features

- User registration and authentication
- Campground creation, editing, and deletion
- Image uploading for campgrounds using Cloudinary
- Campground location display using MapBox API
- Campground searching and filtering
- User reviews and ratings for campgrounds
- User profiles with a list of their posted campgrounds and reviews

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Cloudinary
- MapBox API
- Embedded JavaScript (EJS)
- BCrypt
- Passport.js

## Project Initialization

1. Clone the repository: `git clone https://github.com/yorkpshaw/YelpCamp`
2. CD into the project directory
3. Install the dependencies with `npm install`
4. Start the application with `npm start`
5. Open web browser and visit `http://localhost:3000`

Docker Instructions:
1. Clone the repository: `git clone https://github.com/yorkpshaw/YelpCamp`
2. CD into the new project directory
3. Run `docker compose build`
4. Run `docker compose up`
5. Visit `http://localhost:3000/`

## Usage

- Register a new account
- Browse the list of campgrounds and click on a campground to view more details
- Create your own campground by clicking on "New Campground" and fill out the form
- Edit or delete campgrounds you have created
- Add reviews, ratings, and pictures for campgrounds

## Acknowledgements
- The YelpCamp project was inspired by Colt Steele's "The Web Developer Bootcamp" course on Udemy.
