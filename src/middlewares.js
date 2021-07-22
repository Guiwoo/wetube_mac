import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUploads = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 10485760,
  },
});

export const videoUploads = multer({
  dest: "uploads/vidoes/",
  limits: {
    fileSize: 10485760,
  },
});
