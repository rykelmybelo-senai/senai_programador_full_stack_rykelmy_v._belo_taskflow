import { useState, useEffect } from "react";
import styles from "./ModalTarefa.module.css";
import { mensagensDeErro } from "../api";
import { useAuth } from "../contexts/AuthContext";
// import axios from "axios";

function paraNumero(valor) {
  return valor ? Number(valor) : null;
}

function ModalTarefa({
  aberto,
  onFechar,
  onSalvar,
  tarefa = null,
  coluna = "afazer",
  prioridades = [],
  usuarios = [],
  projetos = [],
}) {
  const { usuario } = useAuth();
  const [texto, setTexto] = useState("");
  const [idPrioridade, setIdPrioridade] = useState(2); // Médio
  const [idUsuario, setIdUsuario] = useState("");
  const [idProjeto, setIdProjeto] = useState("");
  const [erros, setErros] = useState([]);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    setErros ([]);
    if (tarefa) {
      setTexto(tarefa.texto);
      setIdPrioridade(tarefa.prioridade_id);
      setIdUsuario(tarefa.usuario_id);
      setIdProjeto(tarefa.projeto_id);
    } else {
      setTexto("");
      setIdPrioridade(2);
      setIdUsuario(usuario?.id || usuarios[0]?.id || "");
      setIdProjeto(projetos[0]?.id || "");
    }
  }, [tarefa, aberto]);

  useEffect(() => {
    if (!aberto) return;

    function handleEsc(e) {
      if (e.key === "Escape") onFechar();
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  });

  // async function consultarCidade (cepDigitado) {
  //     if (cepDigitado.trim() .length < 8) return;
  //     try {
  //         const { data } = await axios.get (
  //             `https://viacep.com.br/ws/${cepDigitado}/json/`
  //         );
  //         if (!data.erro) setCidade('📍' + data.localidade + '/' + data.uf);
  //     } catch (e) {
  //         console.log("Erro ao consultar CEP:", e);
  //     }

  // }

  async function handleSalvar() {
    if (texto.trim() === "") return;
    setErros([]);
    setSalvando(true);
    try {
        await onSalvar({
            ...tarefa,
            id: tarefa?.id, // undefined = criar | número = editar
            texto,
            coluna: tarefa?.coluna || coluna,
            prioridade_id: paraNumero(idPrioridade),
            usuario_id: paraNumero(idUsuario),
            projeto_id: paraNumero(idProjeto),
        });
    onFechar();
  } catch (e) {
    setErros(mensagensDeErro (e));
  } finally {
    setSalvando(false)
  }
}
  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <h2>{tarefa ? "Editar tarefa" : "Nova tarefa"}</h2>
        <input
          placeholder="Texto da tarefa"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <input
          placeholder="Responsável"
          value={idUsuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          placeholder="Projeto"
          value={idProjeto}
          onChange={(e) => setProjeto(e.target.value)}
        />
        <div className={styles.botoes}>
          <button onClick={onFechar}>Cancelar</button>
          <button onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
export default ModalTarefa;
