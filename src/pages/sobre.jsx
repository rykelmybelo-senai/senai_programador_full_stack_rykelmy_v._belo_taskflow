import styles from "./sobre.module.css";

function Sobre() {
  return (
    <div className={styles.containerSobre}>
      <div className={styles.headerSobre}>
        <h1>Sobre</h1>
      </div>

      <div className={styles.conteudoSobre}>
        <section>
          <p>
            O TaskFlow nasceu no laboratório de informática do Senai-RN como projeto integrador para fins de avaliação dos conhecimentos adquiridos durante a qualificação profissional em Programação Full Stack.
          </p>
          <p>
            A aplicação permite criar, gerenciar, categorizar e acompanhar o progresso de tarefas.
          </p>
        </section>

        <section>
          <h3>Desenvolvimento</h3>
          <p>
            O TaskFlow foi desenvolvido por Rykelmy V. Belo como projeto prático durante a formação no curso de Programador Full Stack do SENAI em parceria com a Petrobras.
          </p>
          <p>
            A proposta da aplicação foi aplicar de ponta a ponta os conceitos modernos de desenvolvimento web, abrangendo desde a concepção do layout e experiência do usuário (UX/UI) até a construção e integração de API.
          </p>
        </section>

        <section>
          <h3>Tecnologias usadas + futuras</h3>
          <ul>
            <li><strong>Front-end:</strong> Criação de componentes reutilizáveis, gerenciamento de estado e interface responsiva.</li>
            <li><strong>Back-end:</strong> Construção de API, rotas autenticadas e regras de negócio.</li>
            <li><strong>Banco de Dados:</strong> Modelagem e persistência de dados.</li>
            <li><strong>Boas Práticas:</strong> Código limpo, componentização e controle de versão com Git.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Sobre;