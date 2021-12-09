import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/CommentSection";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server connected on ${PORT}`);
};

app.listen(PORT, handleListening);
