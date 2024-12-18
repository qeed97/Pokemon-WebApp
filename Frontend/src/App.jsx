import {BrowserRouter, Route, Routes} from "react-router-dom"
import {useState, useEffect} from 'react';
import Locations from "./pages/Locations.jsx";
import Encounter from "./pages/Encounter.jsx";
import Battle from "./pages/Battle.jsx";

function App() {
    const [enemyPokemon , setEnemyPokemon] = useState(null);
    const [allyPokemon , setAllyPokemon] = useState(null);
    const [encId, setEncId] = useState(null);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Locations setEncId={setEncId} />} />
              <Route path="/encounter" element={<Encounter encId={encId} setEnemyPokemon={setEnemyPokemon} setAllyPokemon={setAllyPokemon}/>} />
              <Route path="/battle" element={<Battle enemyPokemon={enemyPokemon} allyPokemon={allyPokemon}/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
