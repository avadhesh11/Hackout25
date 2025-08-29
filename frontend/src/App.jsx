import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import MapComponent from "./components/Map";
function App() {

  return (
    <>
    <Routes>
      
      <Route path="/map" element={<MapComponent />} />
    </Routes>
    </>
  )
}

export default App
