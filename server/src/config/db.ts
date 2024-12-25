// src/config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI!);
    console.log("Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }
};
