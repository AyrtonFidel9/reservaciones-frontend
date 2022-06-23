import React from 'react';
import Inicio from './pages/Inicio';
import Reserva from './pages/Reserva';
import IngresarReserva from './pages/IngresarReserva';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@fontsource/nunito";
import ReservasList from './Reservas/ReservasList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/reserva" element={<Reserva/>}>
          <Route index element={<IngresarReserva/>}/>
          <Route path="ingresar" element={<IngresarReserva/>}/>
          <Route path="mis-reservas" element={<ReservasList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
