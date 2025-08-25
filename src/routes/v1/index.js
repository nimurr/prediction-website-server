const express = require("express");
const config = require("../../config/config");
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const docsRoute = require("./docs.routes");
const scorePredictionRoute = require("./scorePredction.routes"); // Importing the score prediction route
const scorePricePredictionRoute = require("./pricePrediction.routes"); // Importing the price prediction route
const pokerTornamentRoute = require("./pokerTornament.routes"); // Importing the poker tournament route
const privacyPolicyRoute = require("./privacyPolicy.routes"); // Importing the privacy policy route

const casinoReviewsRoute = require("./casinoReviews.routes"); // Importing the casino reviews route

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/score-prediction",
    route: scorePredictionRoute, // Adding the score prediction route
  },
  {
    path: "/price-prediction",
    route: scorePricePredictionRoute, // Adding the price prediction route
  },
  {
    path: "/poker-tournament",
    route: pokerTornamentRoute, // Adding the poker tournament route
  },
  {
    path: "/casino-reviews",
    route: casinoReviewsRoute, // Adding the casino reviews route
  },



  {
    path: "/privacy-policy",
    route: privacyPolicyRoute, // Adding the privacy policy route
  }

];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
