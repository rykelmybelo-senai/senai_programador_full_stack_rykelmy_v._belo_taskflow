import { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    setErro("");
    try {
      const resposta = await api.post("/auth/login", {
        email,
        senha,
      });
      const { token, usuario } = resposta.data;

      login(usuario, token);
      navigate("/");
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao fazer login");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="login-container">
      <div className={`login-card ${shake ? "shake" : ""}`}>
        <h1 className="login-logo">Login</h1>
        <p className="login-subtitulo">Informe suas credenciais para continuar</p>

        {/* Input de usuário — estado controlado */}

        <label htmlFor="email">Email</label>

        <input
          className="login-input"
          type="text"
          placeholder="Ex: seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Input de senha — type='password' oculta os caracteres */}

        <label htmlFor="senha">Senha</label>

        <input
          className="login-input"
          type="password"
          placeholder="Informe sua senha"
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
          <br />
          Desenvolvido por: <em>Rykelmy V. Belo (⌐■_■)</em>
        </p>
      </div>
    </div>
  );
}
export default Login;
