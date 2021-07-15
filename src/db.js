import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log("❌ Db error", error));
db.once("open", () => console.log("✅ Connected to DB 🚀"));
