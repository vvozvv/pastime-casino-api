const JwtStategy = require('passport-jwt').Strategy
const ExtraxtJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = passport => {
  let opt = {
    jwtFromRequest: ExtraxtJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
  }

  passport.use(new JwtStategy(opt, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId).select('email id')

      if (user)  {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch(e) {
      console.log(e);
    }
  }))
}