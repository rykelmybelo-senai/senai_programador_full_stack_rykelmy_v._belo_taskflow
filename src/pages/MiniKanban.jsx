import ModalTarefa from "../componentes/ModalTarefa";
import { useState, useEffect } from "react";
import ListaTarefas from "../componentes/ListaTarefas";
import Header from "../componentes/Header";
import api, { mensagensDeErro } from "../api";

export default function MiniKanban() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [listaPrioridades, setListaPrioridades] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaProjetos, setListaProjetos] = useState([]);

  // useEffect(() => {
  //   if (erro) {
  //     window.alert(erro);
  //     setErro("");
  //   }
  // }, [erro]);

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");

        const [respPrioridades, respTarefas, respUsuarios, respProjetos] =
          await Promise.all([
            api.get("/prioridades"),
            api.get("/tarefas"),
            api.get("/usuarios"),
            api.get("/projetos"),
          ]);

        setListaPrioridades(respPrioridades.data);
        setTarefas(respTarefas.data);
        setListaUsuarios(respUsuarios.data);
        setListaProjetos(respProjetos.data);
      } catch (e) {
        setErro(mensagensDeErro(e).join("\n"));
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
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
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (e) {
      alert(mensagensDeErro(e).join("\n"));
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
      alert(mensagensDeErro(e).join("\n"));
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
    if (dados.id) {
      const resposta = await api.put(`/tarefas/${dados.id}`, dados);
      setTarefas(tarefas.map((t) => (t.id === dados.id ? resposta.data : t)));
    } else {
      const resposta = await api.post("/tarefas", dados);
      setTarefas([...tarefas, resposta.data]);
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
                prioridades={listaPrioridades}
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
                prioridades={listaPrioridades}
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
                prioridades={listaPrioridades}
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
              prioridades={listaPrioridades}
              usuarios={listaUsuarios}
              projetos={listaProjetos}
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
