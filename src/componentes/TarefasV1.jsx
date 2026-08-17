// import "./App.css";
// import Saudacao from './Saudacao'
import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import ListaTarefas from "./ListaTarefas";
// import TarefaItem from "./componentes/TarefaItem";

function TarefasV1() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("taskflow-tarefas");

    if (!tarefasSalvas) {
      return [];
    }
    const tarefasConvertidas = JSON.parse(tarefasSalvas);
    return Array.isArray(tarefasConvertidas) ? tarefasConvertidas : [];
  });

  const [proximoId, setProximoId] = useState(1);
  const [texto, setTexto] = useState("");
  const [textoCep, setTextoCep] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  const inputRef = useRef(null);

  // // Atualiza o título da página com o número de tarefas pendentes
  // useEffect(() => {
  //   const pendentes = tarefas.filter((t) => !t.concluida).length;
  //   if (pendentes > 0) {
  //     document.title = "(" + pendentes + ") TaskFlow";
  //   } else {
  //     document.title = "TaskFlow";
  //   }
  // }, [tarefas]);

  // EFEITO 2 — salvar quando tarefas mudar
  useEffect(() => {
    localStorage.setItem("taskflow-tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Função para adicionar uma nova tarefa
  function adicionarTarefa() {
    if (texto.trim() === "") return;

    const novaTarefa = {
      id: proximoId,
      texto: texto.trim(),
      concluida: false,
      prioridade: prioridade,
      coluna: "a-fazer",
      cep: textoCep.trim(),
    };

    setTarefas([...tarefas, novaTarefa]);
    setProximoId(proximoId + 1);
    setTexto("");
    setPrioridade("media");

    inputRef.current.focus();
  }

  const deletarTarefa = (id) => {
    const tarefasAtualizadas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(tarefasAtualizadas);
  };

  const alternarConcluida = (id) => {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(tarefasAtualizadas);
  };

  return (
    <>
      <Header
        titulo="TaskFlow"
        subtitulo="Gerencie suas tarefas"
        tarefas={tarefas}
      />
      <main className="container">
        {/* Formulário de adicionar tarefa */}
        <section id="formulario">
          <div className="campo-linha">
            <input
              ref={inputRef}
              id="input-tarefa"
              type="text"
              placeholder="Nova tarefa..."
              required
              autoComplete="off"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <input
              type="text"
              id="input-cep"
              placeholder="Digite o CEP..."
              value={textoCep}
              onChange={(e) => setTextoCep(e.target.value)}
            />
            <select
              id="sel-prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="alta">🔴 Alta</option>
              <option value="media">🟡 Média</option>
              <option value="baixa">🟢 Baixa</option>
            </select>
            <button id="btn-adicionar" type="button" onClick={adicionarTarefa}>
              Adicionar
            </button>
          </div>
        </section>

        {/* Filtros */}
        <section id="controles">
          <div id="filtros">
            <button className="btn-filtro ativo" data-filtro="todas">
              Todas
            </button>
            <button className="btn-filtro" data-filtro="pendentes">
              Pendentes
            </button>
            <button className="btn-filtro" data-filtro="concluidas">
              Concluídas
            </button>
          </div>
        </section>

        {/* Lista de tarefas */}
        <ListaTarefas
          tarefas={tarefas}
          onDeletar={deletarTarefa}
          onConcluir={alternarConcluida}
        />
      </main>
    </>
  );
}

export default TarefasV1;
