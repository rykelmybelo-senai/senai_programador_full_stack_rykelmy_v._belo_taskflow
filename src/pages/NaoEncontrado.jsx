import { Link } from "react-router-dom";
import styles from "./NaoEncontrado.module.css";

function NaoEncontrado() {
  return (
    <main className={styles.container404}>
      <div className={styles.conteudoTexto}>
        <h2>Ops! Rota perdida.</h2>
        <p>
          Parece que você tentou acessar uma página que não existe no TaskFlow.
        </p>
        <Link to="/" className={styles.btnVoltar}>
          Ir para o login
        </Link>
      </div>

      <div className={styles.faceContainer}>
        <svg className={styles.face} viewBox="0 0 320 380">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="25"
          >
            <g className={styles.eyes} transform="translate(0,112.5)">
              <g transform="translate(15,0)">
                <polyline
                  className={styles.eyeLid}
                  points="37,0 0,120 75,120"
                ></polyline>
                <polyline
                  className={styles.pupil}
                  points="55,120 55,155"
                  strokeDasharray="35 35"
                ></polyline>
              </g>
              <g transform="translate(230,0)">
                <polyline
                  className={styles.eyeLid}
                  points="37,0 0,120 75,120"
                ></polyline>
                <polyline
                  className={styles.pupil}
                  points="55,120 55,155"
                  strokeDasharray="35 35"
                ></polyline>
              </g>
            </g>
            <rect
              className={styles.nose}
              x="132.5"
              y="112.5"
              width="55"
              height="155"
              rx="4"
              ry="4"
            ></rect>
            <g transform="translate(65,334)" strokeDasharray="102 102">
              <path
                className={styles.mouthLeft}
                d="M 0 30 C 0 30 40 0 95 0"
              ></path>
              <path
                className={styles.mouthRight}
                d="M 95 0 C 150 0 190 30 190 30"
              ></path>
            </g>
          </g>
        </svg>
      </div>
    </main>
  );
}

export default NaoEncontrado;
