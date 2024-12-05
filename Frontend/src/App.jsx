import {BrowserRouter, Route, Routes} from "react-router-dom"
import {useState, useEffect} from 'react';
import Locations from "./pages/Locations.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Locations />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
