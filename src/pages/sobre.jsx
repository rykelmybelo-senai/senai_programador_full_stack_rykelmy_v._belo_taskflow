import styles from "./sobre.module.css";

function Sobre() {
  return (
    <div className={styles.titulo}>
      <h1>Sobre</h1>
      <h2>O TaskFlow nasceu da necessidade de transformar o caos de tarefas diárias em um fluxo de trabalho claro, produtivo e intuitivo. <br/> Desenvolvido para ajudar pessoas e equipes a organizarem suas rotinas sem complicações, o projeto une uma interface moderna a uma arquitetura funcional de alto desempenho.<br/>
A aplicação permite criar, gerenciar, categorizar e acompanhar o progresso de pendências em tempo real, garantindo que o foco permaneça onde realmente importa: na execução.<br/><br/>
<br/>🎓 Contexto & Desenvolvimento<br/><br/>
O TaskFlow foi desenvolvido por Rykelmy Veloso Belo como projeto prático durante a formação no curso de Programador Full Stack do SENAI.<br/>
A proposta da aplicação foi aplicar de ponta a ponta os conceitos modernos de desenvolvimento de software, abrangendo desde a concepção do layout e experiência do usuário (UX/UI)<br/> até a construção de uma API robusta e integração com banco de dados.<br/><br/>
<br/>🛠️ Tecnologias e Conceitos Aplicados:<br/><br/>
- Front-end: Criação de componentes reutilizáveis, gerenciamento de estado e interface responsiva.<br/>
- Back-end: Construção de API, rotas autenticadas e regras de negócio.<br/>
- Banco de Dados: Modelagem e persistência de dados.<br/>
- Boas Práticas: Código limpo, componentização e controle de versão com Git.<br/></h2>
    </div>

  );
}
export default Sobre;