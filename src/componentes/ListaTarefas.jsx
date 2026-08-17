import TarefaItem from './TarefaItem';

function ListaTarefas({
  tarefas,
  onDeletar,
  onEditar,
  onConcluir,
  

  // Props novas — opcionais, com valor padrão null
  // Só são passadas quando usado dentro de uma coluna do quadro Kanban
  onMover          = null,
  colunaAnterior   = null,
  colunaProxima    = null,
}) {
  return (
    <section id="lista-section">

      {/* Mensagem quando não há tarefas — sem alteração */}
      {tarefas.length === 0 && (
        <p className="msg-vazia">
          Nenhuma tarefa aqui ainda.
        </p>
      )}

      {/* Lista renderizada dinamicamente — sem alteração na estrutura */}
      {tarefas.length > 0 && (
        <ul id="lista-tarefas">
          {tarefas.map(tarefa => (
            <TarefaItem
              key={tarefa.id}
              texto={tarefa.texto}
              cidade={tarefa.cidade}
              concluida={tarefa.concluida}
              prioridade={tarefa.prioridade}
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
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListaTarefas;
