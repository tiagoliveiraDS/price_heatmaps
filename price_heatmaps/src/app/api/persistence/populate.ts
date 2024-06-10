import mongoose from "mongoose";
import fs from "fs";

// Import the Mongoose model or schema definition
import PropertySchema from "./PropertySchema";
import { Property } from "../../domain/Property";



// Function to insert data into the database
async function insertData(data: Property[]) {
  try {
    // Insert each object from the file into the database
    for (const property of data) {
      await PropertySchema.create(property);
    }
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}


export async function populate() {
  const dataFilePath = "extracted.json"; // Assuming data is in a JSON file
  const rawData = fs.readFileSync(dataFilePath, "utf-8");
  const data: Property[] = JSON.parse(rawData);
  await insertData(data);
}
