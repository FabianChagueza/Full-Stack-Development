import { connectDb } from "./db.js";
import app from "./app.js";

connectDb()

app.listen(3000, ()=>{
    console.log("Escuchando en el puerto 3000")
})

