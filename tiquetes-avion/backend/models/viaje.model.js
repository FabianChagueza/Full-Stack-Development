import mongoose from "mongoose";

const paisSchema = new mongoose.Schema({
    origen:{
        type:String,
        required: true,
        trim:true
    },
    destino:{
        type:String,
        required:true,
        trim:true
    },
    dia:{
        type:Date,
        required:true
    }
});

export default mongoose.model("Pais", paisSchema)