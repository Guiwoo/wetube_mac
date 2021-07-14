import userModel from "../models/User";
import bcrypt from "bcrypt";

export const userId = (req, res) => res.send("My porfile");

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password does not match!.",
    });
  }
  const duplicateCheck = await userModel.exists({
    $or: [{ username }, { email }],
  });
  if (duplicateCheck) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await userModel.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res
      .status(404)
      .render("join", { pageTitle: "join", errorMessage: error });
  }
};

export const getLogin = (req, res) => {
  return res.render("Login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const getUser = await userModel.findOne({ username });
  if (!getUser) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "This username does not exist.",
    });
  }
  const ok = await bcrypt.compare(password, getUser.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong Password.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = getUser;
  res.redirect("/");
};

export const logout = (req, res) => res.send("Log out");

export const handleEdit = (req, res) => res.send("Edit");

export const handleDelete = (req, res) => res.send("Delete");
