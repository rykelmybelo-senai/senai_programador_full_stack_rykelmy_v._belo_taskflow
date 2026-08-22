import { Route, Routes } from "react-router-dom";
import RotaPrivada from "./componentes/RotaPrivada";
import "./App.css";
import Sidebar from "./componentes/sidebar";
import Sobre from "./pages/sobre";
import Login from "./pages/login";
import MiniKanban from "./pages/MiniKanban";
import NaoEncontrado from "./pages/NaoEncontrado";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <RotaPrivada>
                <MiniKanban />
              </RotaPrivada>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/sobre" element={<Sobre />} />
          <Route path="/*" element={<NaoEncontrado />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
