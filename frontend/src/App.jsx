
import { map } from 'leaflet';
import './App.css'

import { Routes, Route } from "react-router-dom";
import MapComponent from "./components/Map";
import Sign from "./components/signup.jsx";
import Login from "./components/login.jsx";


import Form from "./components/Form";
function App() {

  return (
    <>
  
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
        <Route path="/Map" element={ <MapComponent/>} />
      </Routes>
       

    
    </>
  )
}

export default App;
