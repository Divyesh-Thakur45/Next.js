import mongoose from "mongoose";

const MONGODB_URL: string = "mongodb://127.0.0.1:27017/nextcrud";
if (!MONGODB_URL) {
  throw new Error("Connection string not found ⚠️");
}
let catched = (global as any).mongoose;
if (!catched) {
  catched = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (catched.conn) {
    return catched.conn;
  }
  if (!catched.promise) {
    catched.promise = mongoose
      .connect("mongodb://127.0.0.1:27017/nextcrud", { bufferCommands: false })
      .then((mongoose) => mongoose);
  }
  catched.conn = await catched.promise;
  return catched.conn;
}
export default connectDB;
