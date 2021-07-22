import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `User` },
});

videoSchema.static("formatHash", function (hashtags) {
  return hashtags
    .split(",")
    .map((hash) => (hash.startsWith("#") ? hash : `#${hash}`));
});

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
