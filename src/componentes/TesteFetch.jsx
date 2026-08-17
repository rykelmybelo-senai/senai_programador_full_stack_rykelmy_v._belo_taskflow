import "./App.css";
import MiniKanban from "./componentes/MiniKanban";

function TesteFet() {
  function executarPromisse() {
    const minhaPromisse = new Promise((resolve, reject) => {
      setTimeout(() => {
        const operacaoDeuCerto = true; // Simula sucesso ou falha

        if (operacaoDeuCerto) {
          resolve("Dados carregados com sucesso!");
        } else {
          reject("Erro ao carregar os dados.");
        }
      }, 5000); // Simula um atraso de 5 segundos
    });

    minhaPromisse
      .then((mensagem) => {
        console.log(mensagem);
      })
      .catch((erro) => {
        console.error(erro);
      });
    console.log("Carregando dados...");
  }

  // Com Async/Await + Consumindo uma API
  async function buscarUsuario(id) {
    try {
      const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + id
      );

      const usuario = await resposta.json();
      console.log("Resposta da API:", usuario);
      console.log("Nome:", usuario.name);
      return usuario;

    } catch (erro) {
      console.error(erro);
      return null;
    
    } finally {
      console.log("Busca finalizada.");
    }
  }

  return (
    <>
      <div>
        <button onClick={executarPromisse}>Carregar Dados (função)</button>
      </div>
      <div>
        <button onClick={() => buscarUsuario(1)}>
          Buscar Usuário (async/await)
        </button>
      </div>
      <header>
        <div className="container">
          <div className="logo">
            <h1>TaskFlow</h1>
            <p>Quadro de tarefas - Mini Kanban</p>
          </div>
        </div>
      </header>

      <main style={{ padding: "28px 0" }}>
        <MiniKanban />
      </main>

      <footer>
        <p>
          Desenvolvido por: <em>Rykelmy V. Belo</em>
        </p>
        <p>TaskFlow — SENAI CTGAS-ER · Prof. Alan Glei</p>
      </footer>
    </>
  );
}

export default TesteFet;
