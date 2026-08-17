import styles from './Header.module.css';

function Header({titulo = "Informe o Título", subtitulo = "Informe o subtítulo"}) {

  // const Total = tarefas.length;
  // const Pendentes = tarefas.filter(tarefa => !tarefa.concluida).length;
  // const Concluidas = tarefas.filter(tarefa => tarefa.concluida).length;

  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>{titulo}</h1>
            <p>{subtitulo}</p>            
          </div>

          {/* <div id={styles.contadores}>
            <span id="cont-total">{Total} tarefas</span>
            <span className="separador">·</span>
            <span id="cont-pendentes">{Pendentes} pendentes</span>
            <span className="separador">·</span>
            <span id="cont-concluidas">{Concluidas} concluídas</span>
          </div> */}
        </div>
      </header>
  );
}

export default Header;