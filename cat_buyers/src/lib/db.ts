import mongoose from "mongoose";
import "dotenv/config";

const DB_URL: string | null =
  "mongodb+srv://divyeshthakur370:gYOojFBomm9DHmYK@cluster0.vxnybhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!DB_URL) throw new Error("Connection string not found");

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      cached.promise = mongoose
        .connect(DB_URL as string, {
          bufferCommands: false,
        })
        .then((mongoose) => mongoose)
        .catch((err) => console.log("MongoDB connection error : ", err));
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
