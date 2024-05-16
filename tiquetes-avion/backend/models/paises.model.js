import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
        name:String,
        code:String
    });

export default mongoose.model('Country', countrySchema);