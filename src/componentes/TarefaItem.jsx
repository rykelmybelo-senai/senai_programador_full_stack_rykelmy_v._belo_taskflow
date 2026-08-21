import styles from "./TarefaItem.module.css";

function TarefaItem({
  // Props existentes — sem alteração
  texto,
  // concluida = false,
  prioridade = "media",
  onEditar,
  onDeletar,

  // Props novas — opcionais, com valor padrão null
  // Recebidas via ListaTarefas, que injeta o tarefa.id no onMover
  onMover = null,
  colunaAnterior = null,
  colunaProxima = null,
  cidade = null,
}) {
  // ── Classes CSS — sem alteração ──────────────────────────────────────────
  const classeItem = styles.tarefa + " " + styles[prioridade];

  // const classeTexto = concluida
  //   ? styles.textoTarefa + " " + styles["texto-tarefa"]
  //   : styles.textoTarefa;

  const classePrioridade =
    styles["badge-prioridade"] + " " + styles["badge-" + prioridade];

  // ── Modo Kanban: detectado pela presença da prop onMover ─────────────────
  const modoKanban = onMover !== null;

  return (
    <li className={classeItem}>
      <div className={styles.conteudo}>
        {/* Texto da tarefa — duplo clique para concluir (funciona nos dois modos) */}
        <span onDoubleClick={onEditar}>{texto}</span>
        {cidade && <span className={styles.cidade}>{cidade}</span>}
      </div>

      {/* Badge de prioridade — reutilizado nos dois modos sem alteração */}
      <span className={classePrioridade}>{prioridade}</span>

      {/*
        ── Container de ações ────────────────────────────────────────────────
        Modo lista:  só o botão X aparece
        Modo Kanban: botões ← → e X aparecem juntos
      */}
      <div className={styles.acoes}>
        {/* Botão ← só aparece no modo Kanban E se há coluna anterior */}
        {modoKanban && colunaAnterior && (
          <button
            className={styles.btnMover}
            onClick={() => onMover(colunaAnterior)}
            title="Mover para coluna anterior"
          >
            ←
          </button>
        )}
        
        {/* Botão X — deletar — presente nos dois modos */}
        <button className={styles.btnDeletar} onClick={onDeletar}>
          🗑️
        </button>

        {/* Botão → só aparece no modo Kanban E se há próxima coluna */}
        {modoKanban && colunaProxima && (
          <button
            className={styles.btnMover}
            onClick={() => onMover(colunaProxima)}
            title="Mover para próxima coluna"
          >
            →
          </button>
        )}

        {/* <span className={styles.cidade}>{cidade}</span> */}
      </div>
    </li>
  );
}

export default TarefaItem;
