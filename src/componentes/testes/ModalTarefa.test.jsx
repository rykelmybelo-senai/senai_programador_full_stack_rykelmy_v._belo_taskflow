import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalTarefa from "./ModalTarefa";
import { AuthProvider } from "../contexts/AuthContext";

// Listas de exemplo, no formato que a API devolve

const prioridades = [
  { id: 1, descricao: "Alto" },
  { id: 2, descricao: "Médio" },
  { id: 3, descricao: "Baixo" },
];

const usuarios = [
  { id: 1, nome: "Ana Lima" },
  { id: 2, nome: "Bruno Melo" },
];

const projetos = [
  { id: 10, nome: "TaskFlow" },
  { id: 20, nome: "Site da Escola" },
];

function abrirModal(props = {}) {
  render(
    <AuthProvider>
      <ModalTarefa
        aberto={true}
        onFechar={vi.fn()}
        onSalvar={vi.fn()}
        prioridades={prioridades}
        usuarios={usuarios}
        projetos={projetos}
        {...props}
      />
    </AuthProvider>,
  );
}
