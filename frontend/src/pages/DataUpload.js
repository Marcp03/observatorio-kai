import React, { useState } from 'react';
import axios from 'axios';

const DataUpload = () => {
    const [data, setData] = useState({
        type: '',
        date: '',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/data', data);
            console.log('Data uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="type" placeholder="Tipo de violencia" onChange={handleChange} required />
            <input type="date" name="date" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Ubicación" onChange={handleChange} required />
            <textarea name="description" placeholder="Descripción" onChange={handleChange} required></textarea>
            <button type="submit">Cargar Datos</button>
        </form>
    );
};

export default DataUpload;
