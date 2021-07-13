import userModel from "../models/User";
export const userId = (req, res) => res.send("My porfile");

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;
  await userModel.create({
    name,
    email,
    username,
    password,
    location,
  });
  res.redirect("/login");
};

export const login = (req, res) => res.send("Login");

export const logout = (req, res) => res.send("Log out");

export const handleEdit = (req, res) => res.send("Edit");

export const handleDelete = (req, res) => res.send("Delete");
