import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:chVnoqDG7sKhmOjl@cluster0.y3fjmoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {});
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Error connecting to MongoDB");
  }
}

export default connect;