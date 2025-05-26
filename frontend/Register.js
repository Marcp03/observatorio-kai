   import React, { useState } from 'react';
   import axios from 'axios';

   const Register = () => {
       const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');

       const handleSubmit = async (e) => {
           e.preventDefault();
           try {
               await axios.post('http://localhost:3000/register', { username, password });
               alert('Usuario registrado con éxito');
           } catch (error) {
               console.error('Error registrando usuario:', error);
           }
       };

       return (
           <form onSubmit={handleSubmit}>
               <input type="text" placeholder="Nombre de usuario" onChange={(e) => setUsername(e.target.value)} required />
               <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
               <button type="submit">Registrar</button>
           </form>
       );
   };

   export default Register;
   