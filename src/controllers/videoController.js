import videoModel from "../models/Video";
import userModel from "../models/User";

const fakeUser = {
  loggedin: false,
  username: "guiwoo",
};

export const home = async (req, res) => {
  try {
    const videos = await videoModel.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", fakeUser, videos });
  } catch (error) {
    return res.render("Server-Error", { error });
  }
};

export const search = async (req, res) => {
  const {
    query: { keyword },
  } = req;
  let videos = [];
  try {
    videos = await videoModel.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  } catch (error) {
    return res.status(400).render("404", { pageTitle: "Error", error });
  }
  res.render("search", { pageTitle: "Search", videos });
};

export const watch = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await videoModel.findById(id).populate("owner");
    res.render("videos/watch", { pageTitle: video.title, video });
  } catch (error) {
    res.status(400).render("404", { pageTitle: "Can't found video" });
  }
};

export const getHandleEdit = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await videoModel.findById(id);
    res.render("video/edit", {
      pageTitle: `Edit: ${video.title} `,
      fakeUser,
      video,
    });
  } catch (error) {
    res.status(400).render("404", { pageTitle: "Can't Edit" });
  }
};

export const postHandleEdit = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, description, hashtags },
    } = req;
    const video = await videoModel.exists({ _id: id });
    await videoModel.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: videoModel.formatHash(hashtags),
    });
    res.redirect(`/videos/${id}`);
  } catch (e) {
    console.log(error);
    res.status(400).render("404", { pageTitle: "Can't Edit" });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  await videoModel.findByIdAndDelete(id);
  return res.redirect("/");
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload Video" });
  // what is different between and remove
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const {
    body: { title, description, hashtags },
    file: { path },
  } = req;
  try {
    await videoModel.create({
      title,
      description,
      fileUrl: path,
      hashtags: videoModel.formatHash(hashtags),
      owner: _id,
    });
    return res.redirect("/");
  } catch (error) {
    return status(404).res.render("404", {
      pageTitle: `Error`,
      errorMessage: "All fileds are required",
    });
  }
};
