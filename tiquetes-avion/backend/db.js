import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        await mongoose.connect("mongodb+srv://FabianAndres:71260192@cluster0.qah14li.mongodb.net/Tickets_Avion")
        console.log("Conexion a la Base de Datos")
    } catch (error) {
        console.log(error)
    }
}
