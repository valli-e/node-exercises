import { db } from "./db.js"; 
const passport = require('passport');
const passportJwt = require('passport-jwt');
import * as dotenv from "dotenv"; 
dotenv.config()


passport.use(new passportJwt.Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(), 
}, 
async (payload, done) => {
    const user = await db.one(`SELECT * FROM users WHERE id=$1`, payload.id)
   
    try {
        return user ? done(null, user) : done(new Error("User not found"))

    } catch(error) {
        done(error)
    }

}));
