import { Router } from "express";
import {crearViajes,listarViajes,cargarPaises} from '../controllers/paises.controllers.js'


const router = Router()

router.post('/crearViajes', crearViajes)
router.get('/cargarPaises', cargarPaises)
router.get('/listarViajes', listarViajes)

export default router;