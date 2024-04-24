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
        }

    }, {
        timestamps: true,
    }
);

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);