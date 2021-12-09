import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/CommentSection";
import app from "./server";

const PORT = 4000;

const handleListening = () => {
  console.log(`✅http://localhost${PORT} connected`);
};

app.listen(PORT, handleListening);
