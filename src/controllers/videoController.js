import videoModel from "../models/Video";
import userModel from "../models/User";

const fakeUser = {
  loggedin: false,
  username: "guiwoo",
};

export const home = async (req, res) => {
  try {
    const videos = await videoModel
      .find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
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
    videos = await videoModel
      .find({
        title: {
          $regex: new RegExp(`${keyword}$`, "i"),
        },
      })
      .populate("owner");
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
    res.render("videos/watch", {
      pageTitle: video.title,
      video,
      owner: video.owner,
    });
  } catch (error) {
    res.status(400).render("404", { pageTitle: "Can't found video" });
  }
};

export const getHandleEdit = async (req, res) => {
  try {
    const {
      params: { id },
      session: {
        user: { _id },
      },
    } = req;
    const video = await videoModel.findById(id);
    if (String(video.owner) !== _id) {
      return res.status(403).redirect("/");
    }
    res.render("videos/edit", {
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
  try {
    const {
      params: { id },
      session: {
        user: { _id },
      },
    } = req;
    const video = await videoModel.findById(id);
    if (String(video.owner) !== _id) {
      return res.status(403).redirect("/");
    }
    await videoModel.findByIdAndDelete(id);
    const user = await userModel.findById(_id);
    user.videos.splice(user.videos.indexOf(id), 1);
    user.save();
    return res.redirect("/");
    console.log(req.session.user);
  } catch (e) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
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
    const newVideo = await videoModel.create({
      title,
      description,
      fileUrl: path,
      hashtags: videoModel.formatHash(hashtags),
      owner: _id,
    });
    const user = await userModel.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return status(404).res.render("404", {
      pageTitle: `Error`,
      errorMessage: "All fileds are required",
    });
  }
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.status(200);
};
