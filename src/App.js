import Inicio from './pages/Inicio';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@fontsource/nunito";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
