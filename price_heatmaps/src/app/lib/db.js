import mongoose from "mongoose";

global.mongoose = {
  connection: null,
  promise: null
};

export async function connectDB() {
  try {
    if (global.mongoose && global.mongoose.connection) {
      return global.mongoose.connection;
    } else {
      const connString = process.env.MONGO_URL;
      if (!connString) {
        console.log("No connection string provided");
      }

      const promise = await mongoose.connect(connString, {
        autoIndex: true
      });

      global.mongoose = {
        connection: await promise,
        promise
      };
      console.log("Connected to MongoDB successfully");
    }
  } catch (error) {
    throw new Error("Error connecting to MongoDB");
  }
}