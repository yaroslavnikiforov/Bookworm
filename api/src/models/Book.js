import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  covers: { type: Array, required: true },
  goodreadsId: { type: String },
  pages: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

export default mongoose.model("Book", schema);
