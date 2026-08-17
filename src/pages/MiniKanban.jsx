//
import ModalTarefa from "../componentes/ModalTarefa";
import { useState, useEffect } from "react";
import ListaTarefas from "../componentes/ListaTarefas";
import Header from "../componentes/Header";

export default function MiniKanban() {
  // 1. Estado inicial carregando do localStorage
  const [proximoId, setProximoId] = useState(1);
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("kanban_tarefas");
    if (!salvas) return [];
    const tarefasConvertidas = JSON.parse(salvas);
    setProximoId(
      tarefasConvertidas[tarefasConvertidas.length - 1]?.id + 1 || 1,
    );
    return Array.isArray(tarefasConvertidas) ? tarefasConvertidas : [];
  });

  // Persiste as tarefas no localStorage sempre que forem alteradas
  useEffect(() => {
    localStorage.setItem("kanban_tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Mostra o contador na aba do navegador
  useEffect(() => {
    const pendentes = tarefas.filter((t) => t.coluna === "afazer").length;

    if (pendentes > 0) {
      document.title = `(${pendentes}) TaskFlow`;
    } else {
      document.title = "TaskFlow";
    }
  }, [tarefas]);

  // Deletar tarefa
  const deletarTarefa = (id) => {

    const confirmado = window.confirm(
      "Tem certeza que deseja deletar esta tarefa?",
    );
    if (confirmado) {
      setTarefas(tarefas.filter((t) => t.id !== id));
    } 
  };

  // Passo 2: Função moverTarefa sem mutar o array (.map + spread)
  const moverTarefa = (id, novaColuna) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, coluna: novaColuna } // spread copia tudo, só coluna muda
          : tarefa,
      ),
    );
  };

  //Integrando o Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState("afazer");

  function abrirModalCriar(coluna) {
    setTarefaEditando(null);
    setColunaAtiva(coluna);
    setModalAberto(true);
  }

  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  }

  function salvarTarefa(dados) {
    if (dados.id) {
      setTarefas(
        tarefas.map((t) => (t.id === dados.id ? { ...t, ...dados } : t)),
      );
    } else {
      setTarefas([...tarefas, { ...dados, id: proximoId}]);
      setProximoId(proximoId + 1);
    }
  }

  return (
    <>
      <Header
        titulo="Mini Kanban"
        subtitulo="Gerencie suas tarefas"
        tarefas={tarefas}
      />

      <main className="container">
        <div className="kanban-coluna">
          {/* ── COLUNA 1: A FAZER ────────────────────────────────────────── */}
          <div className="kanban-coluna-header">
            <span id="coluna-afazer">
              <h3>A Fazer</h3>
            </span>
              <span className="kanban-contador">
                {tarefas.filter((t) => t.coluna === "afazer").length}
              </span>
              <button
                className="kanban-btn-add"
                onClick={() => abrirModalCriar("afazer")}
              >
                +
              </button>
            </div>
            <ListaTarefas
              tarefas={tarefas.filter((t) => t.coluna === "afazer")}
              onDeletar={deletarTarefa}
              onEditar={abrirModalEditar}
              onMover={moverTarefa}
              colunaAnterior={null}
              colunaProxima="andamento"
            />
        </div>

        {/* ── COLUNA 2: EM ANDAMENTO ───────────────────────────────────── */}
        <div className="kanban-coluna2">
          <div className="kanban-coluna-header">
            <span id="coluna-andamento">
              <h3>Em Andamento</h3>
            </span>
            <span className="kanban-contador">
              {tarefas.filter((t) => t.coluna === "andamento").length}
            </span>
            <button
                className="kanban-btn-add"
                onClick={() => abrirModalCriar("andamento")}
              >
                +
              </button>
          </div>
          <ListaTarefas
            tarefas={tarefas.filter((t) => t.coluna === "andamento")}
            onDeletar={deletarTarefa}
            onEditar={abrirModalEditar}
            onMover={moverTarefa}
            colunaAnterior="afazer"
            colunaProxima="concluido"
          />
        </div>

        {/* ── COLUNA 3: CONCLUÍDO ──────────────────────────────────────── */}
        <div className="kanban-coluna3">
          <div className="kanban-coluna-header">
            <span id="coluna-concluido">
              <h3>Concluído</h3>
            </span>
            <span className="kanban-contador">
              {tarefas.filter((t) => t.coluna === "concluido").length}
            </span>
            <button
                className="kanban-btn-add"
                onClick={() => abrirModalCriar("concluido")}
              >
                +
              </button>
          </div>
          <ListaTarefas
            tarefas={tarefas.filter((t) => t.coluna === "concluido")}
            onDeletar={deletarTarefa}
            onEditar={abrirModalEditar}
            onMover={moverTarefa}
            colunaAnterior="andamento"
            colunaProxima={null}
          />
        </div>

        <ModalTarefa
          aberto={modalAberto}
          onFechar={() => setModalAberto(false)}
          onSalvar={salvarTarefa}
          tarefa={tarefaEditando}
          coluna={colunaAtiva}
        />
      <div>
        <footer>
          <p>
            Desenvolvido por: <em>Rykelmy V. Belo</em>
          </p>
          <p>TaskFlow © 2026 — SENAI CTGAS-ER · Prof. Alan Glei.</p>
        </footer>
      </div>
      </main>
    </>
  );
}
