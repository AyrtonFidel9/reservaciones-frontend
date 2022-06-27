import React from 'react';
import Inicio from './pages/Inicio';
import Reserva from './pages/Reserva';
import IngresarReserva from './pages/IngresarReserva';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@fontsource/nunito";
import ReservasList from './Reservas/ReservasList';
import Login from './Login/Login';
import PrivateRoute from './Security/RutaPrivada';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path='/' element={<PrivateRoute/>}>
          <Route path="/reserva" element={<Reserva/>}>
            <Route index element={<IngresarReserva/>}/>
            <Route path="ingresar" element={<IngresarReserva/>}/>
            <Route path="mis-reservas" element={<ReservasList/>}/>
          </Route>
        </Route>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
