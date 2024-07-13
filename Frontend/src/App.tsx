import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./components/Books";
import Add from "./components/Add";
import Update from "./components/Update";
import Autori from "./components/Autori";
import AutoreAdd from "./components/AutoreAdd";
import AutoreUpdate from "./components/AutoreUpdate";
import Contatti from "./components/Contatti";
import PaginaNonTrovata from "./components/PaginaNonTrovata";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:bookId" element={<Update />} />
          <Route path="/autori" element={<Autori />} />
          <Route path="/autoreAdd" element={<AutoreAdd />} />
          <Route path="/autoreUpdate/:authorId" element={<AutoreUpdate />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="*" element={<PaginaNonTrovata />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
