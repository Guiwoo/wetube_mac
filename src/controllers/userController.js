import userModel from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const userId = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await userModel.findById(id).populate({
      path: "videos",
      populate: {
        path: "owner",
        model: "User",
      },
    });
    return res.render("users/myProfile", {
      pageTitle: `${user.name}`,
      user,
      videos: user.videos,
    });
  } catch (e) {
    res.redirect("/");
  }
};

export const getJoin = (req, res) => {
  return res.render("users/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: "Password does not match!.",
    });
  }
  const duplicateCheck = await userModel.exists({
    $or: [{ username }, { email }],
  });
  if (duplicateCheck) {
    return res.status(400).render("users/join", {
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
      .render("users/join", { pageTitle: "join", errorMessage: error });
  }
};

export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const getUser = await userModel.findOne({ username, githubId: false });
  if (!getUser) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "This username does not exist.",
    });
  }
  const ok = await bcrypt.compare(password, getUser.password);
  if (!ok) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "Wrong Password.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = getUser;
  res.redirect("/");
};

export const logout = (req, res) => {
  req.session.user = null;
  res.locals.loggedInUser = req.session.user;
  req.session.loggedIn = false;
  req.flash("info", "Logged Out");
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("users/editProfile", {
    pageTitle: "Edit Profile",
    errorMessage: "",
  });
};

export const postEdit = async (req, res) => {
  try {
    const {
      session: {
        user: { _id, avatarUrl },
      },
      body: { name, email, username, location },
      file,
    } = req;
    const isHeroku = process.env.NODE_ENV === "production";
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
        name,
        email,
        username,
        location,
      },
      { new: true }
    );
    req.session.user = updatedUser;
    req.flash("info", "Updated Profile");
    return res.redirect("/users/edit");
  } catch (e) {
    const changing = e.keyValue.email ? e.keyValue.email : e.keyValue.username;
    return res.render("/users/editProfile", {
      pageTitle: "Edit Profile",
      errorMessage: e ? `${changing} is already taken!` : "",
    });
  }
};

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const getUrl = `${baseUrl}?${params}`;
  return res.redirect(getUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const getUrl = `${baseUrl}?${params}`;
  const tokenReq = await (
    await fetch(getUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenReq) {
    const { access_token } = tokenReq;
    const apiUrl = "https://api.github.com";
    const userReq = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await userModel.findOne({ email: emailObj.email });
    if (!user) {
      user = await userModel.create({
        avatarUrl: userReq.avatar_url,
        name: userReq.name,
        email: emailObj.email,
        username: userReq.login,
        password: "",
        githubId: true,
        location: userReq.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
    // will fix by notification
  }
};

export const getChangePassword = (req, res) => {
  if (req.session.user.githubId === true) {
    return res.redirect("/");
  }
  return res.render("users/changePassword", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  //send notification
  const {
    body: { oldPassword, newPassword, newPasswordConfirm },
    session: {
      user: { _id, password },
    },
  } = req;
  const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
    return res.status(404).render("users/changePassword", {
      pageTitle: "Chnage Password",
      errorMessage: "Current Password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirm) {
    return res.status(404).render("users/changePassword", {
      pageTitle: "Chnage Password",
      errorMessage: "The Password does not match with confrimation",
    });
  }
  const user = await userModel.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.password = user.password;
  req.flash("info", "Password Changed");
  return res.redirect("/users/logout");
};
