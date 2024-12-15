
import './App.css';
import ListClientesComponent from './components/ListClientesComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddClienteComponent from './components/AddClienteComponent';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<ListClientesComponent/>}></Route>
            <Route path="/clientes" element={<ListClientesComponent/>}></Route>
            <Route path="/add-cliente" element={<AddClienteComponent/>}></Route>
            <Route path="/edit-cliente/:id" element={<AddClienteComponent/>}></Route>
          </Routes>
        </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
