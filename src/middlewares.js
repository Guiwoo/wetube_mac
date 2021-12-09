import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const isHeroku = process.env.NODE_ENV === "production";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "guiwoo-wetube-updated/images",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

const s3VideoUploadr = multerS3({
  s3: s3,
  bucket: "guiwoo-wetube-updated//videos",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Please Log in First");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUploads = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 10485760,
  },
  storage: isHeroku ? s3ImageUploader : undefined,
});

export const videoUploads = multer({
  dest: "uploads/vidoes/",
  limits: {
    fileSize: 10485760,
  },
  storage: isHeroku ? s3VideoUploadr : undefined,
});
