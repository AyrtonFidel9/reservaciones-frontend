import ResponsiveAppBar from '../components/Menu.jsx';
import Comida from '../components/Categoria';
import '../App.css';
import "@fontsource/nunito";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Nunito'
    ].join(','),
  },});


const Inicio = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <ResponsiveAppBar/>
        <section className='presentacion'>
          <div>
            <h1>Bienvenidos</h1>
            <p><i>"Es verdad que comer es una necesidad, pero comer con inteligencia es un arte"</i>
            </p>
            
          </div>
          <div id="calificacion">
            <div className='card'>
              <h4>Promedio de satisfaccion del cliente</h4>
              <p>⭐⭐⭐⭐</p>
            </div>
              
          </div>
        </section>
        <section id="comida">
          <Comida/>
        </section>
      </div>
    </ThemeProvider>
    

  );
}

export default Inicio;