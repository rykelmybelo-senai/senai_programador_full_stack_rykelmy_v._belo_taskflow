import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { logado, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const linkClass = ({ isActive }) =>
    isActive ? styles.link + " " + styles.ativo : styles.link;
  const fecharMenu = () => setMenuAberto(false);

  return (
    <>
      <button
        className={styles.btnMenuMobile}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        ☰
      </button>
      <aside className={`${styles.sidebar} ${menuAberto ? styles.aberta : ""}`}>
        <div className={styles.logo}>
          <h1>TaskFlow</h1>
        </div>

        <nav className={styles.nav}>
          {logado && (
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/sobre" className={linkClass}>
            Sobre
          </NavLink>
        </nav>
        {logado && (
          <button className={styles.btnLogout} onClick={logout}>
            Simbora
          </button>
        )}
      </aside>
      {menuAberto && (
        <div className={styles.overlay} onClick={fecharMenu}></div>
      )}
    </>
  );
}

export default Sidebar;
