   import React, { useState } from 'react';
   import axios from 'axios';

   const Login = () => {
       const [username, setUsername] = useState('');
       const [password, setPassword] = useState('');

       const handleSubmit = async (e) => {
           e.preventDefault();
           try {
               const response = await axios.post('http://localhost:3000/login', { username, password });
               localStorage.setItem('token', response.data.token);
               alert('Inicio de sesión exitoso');
           } catch (error) {
               console.error('Error iniciando sesión:', error);
           }
       };

       return (
           <form onSubmit={handleSubmit}>
               <input type="text" placeholder="Nombre de usuario" onChange={(e) => setUsername(e.target.value)} required />
               <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
               <button type="submit">Iniciar Sesión</button>
           </form>
       );
   };

   export default Login;
   