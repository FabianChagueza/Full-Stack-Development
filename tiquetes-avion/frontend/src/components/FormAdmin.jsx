import React, { useState, useEffect } from 'react';
import './Styles/FormAdmin.css';

const FormAdmin = () => {
    const [listaViajes, setListaViajes] = useState([]);
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [fechaViaje, setFechaViaje] = useState('');

    const obtenerListaViajes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/v1/listarViajes`);
            if (!response.ok) {
                throw new Error('Error al obtener la lista de viajes');
            }
            const data = await response.json();
            setListaViajes(data);
        } catch (error) {
            console.error('Error al obtener la lista de viajes:', error);
        }
    };

    useEffect(() => {
        obtenerListaViajes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/v1/crearViajes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    origen,
                    destino,
                    dia: fechaViaje
                }),
            });
            if (!response.ok) {
                throw new Error('Error al guardar el viaje');
            }
            obtenerListaViajes(); // Llamar a obtenerListaViajes después de guardar el viaje
        } catch (error) {
            console.error('Error al guardar el viaje:', error);
        }
    };

    return (
        <div className='Entrada-wrapper'>
            <div className='container-principal'>
                <form onSubmit={handleSubmit}>
                    <div className='title'>
                        <h1>Tiquetes de Avion</h1>
                    </div>
                    <div className="input-box">
                        <h1>Pais de Origen</h1>
                        <input 
                            type="text" 
                            id="origen" 
                            name="origen" 
                            placeholder='Pais de Origen' 
                            value={origen}
                            onChange={(event) => setOrigen(event.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <h1>Pais de Destino</h1>
                        <input 
                            type="text" 
                            id="destino" 
                            name="destino" 
                            placeholder='Pais de Destino' 
                            value={destino}
                            onChange={(event) => setDestino(event.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-box">
                        <h1>Fecha de Viaje</h1>
                        <input 
                            type="date" 
                            id="fechaViaje" 
                            name="fechaViaje" 
                            value={fechaViaje}
                            onChange={(event) => setFechaViaje(event.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Registrar</button>
                </form>
            </div>
            <div className='container-table'>
                <h1>Lista de Vuelos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Pais de Origen</th>
                            <th>Pais de Destino</th>
                            <th>Fecha de Viaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaViajes.map(viaje => (
                            <tr key={viaje._id}>
                                <td>{viaje.origen}</td>
                                <td>{viaje.destino}</td>
                                <td>{new Date(viaje.dia).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormAdmin;
