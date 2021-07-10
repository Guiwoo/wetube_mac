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

export const watch = (req, res) => {
  const {
    params: { id },
  } = req;
  res.render("watch", { pageTitle: `Watch `, fakeUser });
};

export const getHandleEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  res.render("edit", { pageTitle: `Editing `, fakeUser });
};

export const postHandleEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { title },
  } = req;
  res.redirect(`/videos/${id}`);
};

export const deleteVideo = (req, res) => res.send("Delete Video");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video", fakeUser });
};

export const postUpload = (req, res) => {
  //will add a video to the videos array
  const { title } = req.body;
  return res.redirect("/");
};
