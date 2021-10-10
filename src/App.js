import React, { useState } from "react";
import apiService from "./service";
function App() {
  const [input, setInput] = useState("");
  const [street, setStreet] = useState("");

  async function getCepApi() {
    if (input.length === 8) {
      try {
        const response = await apiService.get(input);
        if (response.erro) {
          setStreet("Cep invalido");
        } else {
          setStreet(response.logradouro);
        }
      } catch (ex) {
        setStreet("Erro ao consultar api");
      }
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Digite o cep</span>
      <input
        placeholder="cep"
        style={{ width: "100px" }}
        onBlur={getCepApi}
        onChange={(e) => setInput(e.target.value)}
        type="number"
      ></input>
      <span>{street}</span>
    </div>
  );
}

export default App;
