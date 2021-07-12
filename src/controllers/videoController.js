import videoModel from "../models/Video";

const fakeUser = {
  loggedin: false,
  username: "guiwoo",
};

export const home = async (req, res) => {
  try {
    const videos = await videoModel.find({});
    return res.render("home", { pageTitle: "Home", fakeUser, videos });
  } catch (error) {
    return res.render("Server-Error", { error });
  }
};

export const search = (req, res) => res.render("search");

export const watch = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await videoModel.findById(id);
    res.render("watch", { pageTitle: video.title, fakeUser, video });
  } catch (error) {
    res.render("404", { pageTitle: "Can't found video", fakeUser });
  }
};

export const getHandleEdit = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await videoModel.findById(id);
    res.render("edit", { pageTitle: `Edit: ${video.title} `, fakeUser, video });
  } catch (error) {
    res.render("404", { pageTitle: "Can't Edit" });
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
    res.render("404", { pageTitle: "Can't Edit" });
  }
};

export const deleteVideo = (req, res) => res.send("Delete Video");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video", fakeUser });
};

export const postUpload = async (req, res) => {
  //will add a video to the videos array
  const { title, description, hashtags } = req.body;
  console.log(title, description, hashtags);
  try {
    await videoModel.create({
      title,
      description,
      hashtags: videoModel.formatHash(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("404", {
      pageTitle: `Error`,
      fakeUser,
      error,
    });
  }
};
