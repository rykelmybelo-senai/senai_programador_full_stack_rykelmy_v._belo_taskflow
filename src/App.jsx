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
                <MiniKanban />
              </RotaPrivada>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="/*"
            element={
              <main class="my-custom-face-container">
                <svg class="face" viewBox="0 0 320 380">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="25"
                  >
                    <g class="face__eyes" transform="translate(0,112.5)">
                      <g transform="translate(15,0)">
                        <polyline
                          class="face__eye-lid"
                          points="37,0 0,120 75,120"
                        ></polyline>
                        <polyline
                          class="face__pupil"
                          points="55,120 55,155"
                          stroke-dasharray="35 35"
                        ></polyline>
                      </g>
                      <g transform="translate(230,0)">
                        <polyline
                          class="face__eye-lid"
                          points="37,0 0,120 75,120"
                        ></polyline>
                        <polyline
                          class="face__pupil"
                          points="55,120 55,155"
                          stroke-dasharray="35 35"
                        ></polyline>
                      </g>
                    </g>
                    <rect
                      class="face__nose"
                      x="132.5"
                      y="112.5"
                      width="55"
                      height="155"
                      rx="4"
                      ry="4"
                    ></rect>
                    <g transform="translate(65,334)" stroke-dasharray="102 102">
                      <path
                        class="face__mouth-left"
                        d="M 0 30 C 0 30 40 0 95 0"
                      ></path>
                      <path
                        class="face__mouth-right"
                        d="M 95 0 C 150 0 190 30 190 30"
                      ></path>
                    </g>
                  </g>
                </svg>
              </main>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
export default App;
