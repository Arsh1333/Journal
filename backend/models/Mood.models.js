import mongoose, { mongo } from "mongoose";

const moodSchema = new Schema(
  {
    mood: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Mood = mongoose.model("Mood", moodSchema);
