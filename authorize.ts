import { Request, Response, NextFunction } from "express";
import passport from "passport";

interface CustomRequest extends Request {
  user?: any;
}

const authorize = (req: CustomRequest, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      res.status(401).json({ msg: "unauthorized" });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

export default authorize;
