import ModalTarefa from "../componentes/ModalTarefa";
import { useState, useEffect } from "react";
import ListaTarefas from "../componentes/ListaTarefas";
import Header from "../componentes/Header";
import api from "../api";

export default function MiniKanban() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (erro) {
      window.alert(erro);
      setErro("");
    }
  }, [erro]);

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await api.get("/tarefas");

        setTarefas(resposta.data);
      } catch (e) {
        setErro("Erro ao carregar tarefas. Verifique a conexão.");
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, []);

  // Deletar tarefa
  async function deletarTarefa(id) {
    const confirmado = window.confirm(
      "Tem certeza que deseja deletar esta tarefa?",
    );
    if (!confirmado) return;
    try {
      // DELETE na API — id na URL
      await api.delete("/tarefas/" + id);

      // Remover do estado local apenas apos confirmar na API
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
    } catch (e) {
      setErro("Erro ao deletar tarefa. Tente novamente.");
      console.error(e);
    }
  }

  // Função moverTarefa sem mutar o array (.map + spread)
  async function moverTarefa(id, novaColuna) {
    try {
      const tarefaAtual = tarefas.find((t) => t.id === id);
      const { data: tarefaMovida } = await api.put(`/tarefas/${id}`, {
        ...tarefaAtual,
        coluna: novaColuna,
      });
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((t) => (t.id === id ? tarefaMovida : t)),
      );
    } catch (e) {
      setErro("Erro ao mover a tarefa. Tente novamente.");
      console.error(e);
    }
  }

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

  async function salvarTarefa(dados) {
    try {
      if (dados.id !== undefined) {
        // EDITAR — PUT com o id na URL
        const { data: tarefaEditada } = await api.put(
          "/tarefas/" + dados.id,
          dados,
        );

        // Atualizar a tarefa no estado local
        setTarefas((tarefasAtuais) =>
          tarefasAtuais.map((t) => (t.id === dados.id ? tarefaEditada : t)),
        );
        if (erro) {
          setErro("Erro ao editar tarefa. Tente novamente.");
        }
      } else {
        // CRIAR — POST
        const { data: novaTarefa } = await api.post("/tarefas", dados);
        setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
      }
    } catch (e) {
      setErro("Erro ao salvar tarefa.");
      console.error(e);
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
        {carregando && (
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        )}
        {/* {erro && (
          <p style={{ textAlign: "center", color: "#EF4444" }}>{erro}</p>
        )} */}
        {!carregando && (
          <>
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

            {/*── COLUNA 2: EM ANDAMENTO ──────*/}
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
            <div style={{ width: "100%", marginTop: "40px" }}>
              <footer>
                <p>
                  Desenvolvido por: <em>Rykelmy V. Belo</em>
                </p>
                <p>TaskFlow © 2026 · SENAI CTGAS-ER RN · Prof. Alan Glei.</p>
              </footer>
            </div>
          </>
        )}
      </main>
    </>
  );
}
