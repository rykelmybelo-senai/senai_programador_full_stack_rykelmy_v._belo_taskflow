import TarefaItem from "./TarefaItem";

const CLASSE_PRIORIDADE = { 1: "baixa", 2: "media", 3: "alta" };

function ListaTarefas({
  tarefas = [],
  prioridade = [],
  onDeletar,
  onEditar,
  onConcluir,
  onMover = null,
  colunaAnterior = null,
  colunaProxima = null,
}) {
  return (
    <section id="lista-section">
      {/* Mensagem quando não há tarefas */}
      {tarefas.length === 0 && (
        <p className="msg-vazia">Nenhuma tarefa aqui ainda.</p>
      )}

      {/* Lista renderizada dinamicamente */}
      {tarefas.length > 0 && (
        <ul id="lista-tarefas">
          {tarefas.map((tarefa) => {
            const itemPrioridade = prioridade.find(
              (p) => p.id === tarefa.prioridade_id,
            );

            return (
              <TarefaItem
                key={tarefa.id}
                texto={tarefa.texto}
                concluida={tarefa.concluida}
                prioridade={CLASSE_PRIORIDADE[tarefa.prioridade_id] || "media"}
                rotuloPrioridade={itemPrioridade?.descricao}
                onDeletar={() => onDeletar(tarefa.id)}
                onConcluir={() => onConcluir(tarefa.id)}
                onEditar={onEditar ? () => onEditar(tarefa) : undefined}
                onMover={
                  onMover
                    ? (novaColuna) => onMover(tarefa.id, novaColuna)
                    : null
                }
                colunaAnterior={colunaAnterior}
                colunaProxima={colunaProxima}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default ListaTarefas;
