import { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const {login} = useAuth();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    if (usuario === "admin" && senha === "1234") {
      login(); // atualiza o estado no App.jsx
      navigate("/"); // redireciona — chamado APÓS a ação

      return;
    }

    // Credenciais erradas → exibe mensagem de erro

    setErro("Usuário ou senha incorretos");
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  return (
    <div className="login-container">
      <div className={`login-card ${shake ? 'shake' : ''}`}>
        <h1 className="login-bolls">🔴🟡🟢 </h1>
        <h1 className="login-logo">TaskFlow</h1>
        <p className="login-subtitulo">Faça login para continuar</p>

        {/* Input de usuário — estado controlado */}

        <input
          className="login-input"
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        {/* Input de senha — type='password' oculta os caracteres */}

        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {/* Mensagem de erro — renderização condicional com && */}

        {erro && <p className="login-erro">{erro}</p>}
        <button className="login-btn" onClick={handleLogin}>
          Entrar
        </button>

        <p className="login-aviso">
          Este login é apenas para fins didáticos. Credenciais reais vêm no
          módulo back-end.<br /><br />
          Desenvolvido por: <em>Rykelmy V. Belo (⌐■_■)</em>
        </p>
      </div>
    </div>
  );
}
export default Login;
