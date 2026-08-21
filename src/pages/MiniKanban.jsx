//
import ModalTarefa from "../componentes/ModalTarefa";
import { useState, useEffect } from "react";
import ListaTarefas from "../componentes/ListaTarefas";
import Header from "../componentes/Header";
import axios from "axios";

export default function MiniKanban() {
  const URL_API = "https://6a85ac489c451dc67a63f0c8.mockapi.io/api/v1";
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const resposta = await axios.get(URL_API + "/tarefas");
        await new Promise((resolve) => setTimeout(resolve, 1000));

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
      await axios.delete(URL_API + "/tarefas/" + id);

      // Remover do estado local apenas apos confirmar na API
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((t) => t.id !== id));
    } catch (e) {
      setErro("Erro ao deletar tarefa. Tente novamente.");
      console.error(e);
    }
  }

  // Passo 2: Função moverTarefa sem mutar o array (.map + spread)
  async function moverTarefa(id, novaColuna) {
    try {
      // PATCH — envia apenas o campo coluna
      const { data: tarefaMovida } = await axios.put(
        URL_API + "/tarefas/" + id,
        { coluna: novaColuna },
      );

      // Atualizar o estado local com a tarefa retornada

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((t) => (t.id === id ? tarefaMovida : t)),
      );
    } catch (e) {
      setErro("Erro ao mover tarefa. Tente novamente.");
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
        const { data: tarefaEditada } = await axios.put(
          URL_API + "/tarefas/" + dados.id,
          {
            texto: dados.texto,
            prioridade: dados.prioridade,
            cidade: dados.cidade,
            coluna: dados.coluna,
          },
        );

        // Atualizar a tarefa no estado local
        setTarefas((tarefasAtuais) =>
          tarefasAtuais.map((t) => (t.id === dados.id ? tarefaEditada : t)),
        );
      } else {
        // CRIAR — POST
        const { data: novaTarefa } = await axios.post(
          URL_API + "/tarefas",
          dados,
        );
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
          <p
            style={{
              maxWidth: "2000px",
              textAlign: "center",
              alignItems: "center",
              color: "#f09819",
              padding: "40px 490px",
            }}
          >
            CARREGANDO TAREFAS...
          </p>
        )}
        {erro && (
          <p style={{ textAlign: "center", color: "#EF4444" }}>{erro}</p>
        )}
        {!carregando && !erro && (
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
            <div>
              <footer>
                <p>
                  Desenvolvido por: <em>Rykelmy V. Belo</em>
                </p>
                <p>TaskFlow © 2026 — SENAI CTGAS-ER · Prof. Alan Glei.</p>
              </footer>
            </div>
          </>
        )}
      </main>
    </>
  );
}
