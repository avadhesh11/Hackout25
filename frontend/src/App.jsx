
import { map } from 'leaflet';
import './App.css'
import { Routes, Route } from "react-router-dom";
import MapComponent from "./components/Map";
import Form from "./components/Form";
function App() {

  return (
   <Routes>
    <Route path='/' element={<MapComponent />}/>
    <Route path='/form' element={<Form/>}/>
   </Routes>
  )
}

export default App
