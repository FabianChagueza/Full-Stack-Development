import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Country from '../models/paises.model.js';
import crear from '../models/viaje.model.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const crearViajes = async(req,res) =>{
    try{
        const {origen,destino,dia} = req.body;
        const newPais = new crear({
            origen,
            destino,
            dia
        })
        const guardarViaje = await newPais.save()
        res.json(guardarViaje)
    } catch (error){
        console.log('error al guardar el viaje', error)
        res.status(501).json({ Message :'error al guardar el viaje'})
    }
}
export const listarViajes = async(req,res) =>{
    
    try {
        const listar= await crear.find();

        res.status(200).json(listar)
    } catch (error) {
        console.error('error al listar')
        res.status(500).json({message:'ha ocurrido un error'})
    }
    
}

export const cargarPaises = async (req,res)=>{
    
    try {
        const jsonFilePath = path.resolve(__dirname, '../db/Countries.json');
        
        const contenidoBuffer = await fs.readFile(jsonFilePath,'utf-8');
        const contenido = contenidoBuffer.toString();
        
        const data = JSON.parse(contenido)
        
        await Country.insertMany(data.countries);
        
        res.status(200).json({message: "Paises incertado correctamente"})
        
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        res.status(500).json({ error: "Error al cargar los datos" });
    }
}