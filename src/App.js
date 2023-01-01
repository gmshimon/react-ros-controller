import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Body from './Components/Body/Body';
import { Route, Routes } from 'react-router-dom';
import About from './Components/About/About';

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Body></Body>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
