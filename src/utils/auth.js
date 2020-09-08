const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;

passport.use(
  new BearerStrategy((token, cb) => {
    console.log(token);
  })
);

module.exports = passport;
