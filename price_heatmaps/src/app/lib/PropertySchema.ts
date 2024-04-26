import mongoose from "mongoose";

const {Schema} = mongoose;

const PropertySchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        county: {
            type: String,
            required: true,
        },
        parish: {
            type: String,
            required: true,
        },

    }, {
        timestamps: true,
    }
);

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);