import React from 'react';
import Inicio from './pages/Inicio';
import Reserva from './pages/Reserva';
import IngresarReserva from './pages/IngresarReserva';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@fontsource/nunito";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/reserva" element={<Reserva/>} />
        <Route path="/ingresar-reserva" element={<IngresarReserva/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
