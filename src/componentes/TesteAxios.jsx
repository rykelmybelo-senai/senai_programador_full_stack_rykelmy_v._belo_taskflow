import axios from "axios";
import { useState } from "react";

//Consulta CEP na API
function ConsultarCep() {
  async function buscarCep(cep) {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log("Resposta da API:", resposta.data);
      console.log("CEP:", resposta.data.cep);
      console.log("Logradouro:", resposta.data.logradouro);
      console.log("Bairro:", resposta.data.bairro);
      console.log("Cidade:", resposta.data.localidade);
      console.log("Estado:", resposta.data.uf);
      console.log("DDD:", resposta.data.ddd);
      console.log("Região:", resposta.data.regiao);
    } catch (erro) {
      console.error("Erro ao buscar CEP:", erro.message);
    }
  }

  const [texto, setTexto] = useState("");
  return (
    <div>
      <input
        type="text"
        id="input-cep"
        placeholder="Digite o CEP..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button onClick={() => buscarCep(texto)}>Consultar CEP</button>
    </div>
  );
}

//Consulta id de uma pessoa na API (válido até 10)
// function TesteAxios() {
//   async function exemplo() {
//     try {
//       const resposta = await axios.get(
//         "https://jsonplaceholder.typicode.com/users/10",
//       );
//       console.log("Resposta da API:", resposta.data);
//       console.log("Nome:", resposta.data.name);
//       console.log("Email:", resposta.data.email);
//       console.log("Cidade:", resposta.data.address.city);
//     } catch (erro) {
//       console.error(erro.message);
//     }
//   }

//   return (
//     <div>
//       <button onClick={exemplo}>Testar Axios</button>
//     </div>
//   );
// }

export default ConsultarCep;
