// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RotaPrivada from "./componentes/RotaPrivada";
import "./App.css";
import Sidebar from "./componentes/sidebar";
// import MiniKanban from "./componentes/MiniKanban";
// import Dashboard from "./pages/dashboard";
import Sobre from "./pages/sobre";
import Login from "./pages/login";
import MiniKanban from "./pages/MiniKanban";

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
                <MiniKanban />{" "}
              </RotaPrivada>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
