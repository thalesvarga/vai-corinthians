import Botao from "../Botao/botao";
import CampoImagem from "../CampoImagem";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import "./formulario.css";
import { useState, useRef } from "react";

const Formulario = ({ genero, aoJogadorCadastrado }) => {
  const anos = Array.from({ length: 2025 - 1910 + 1 }, (_, i) => 2025 - i);

  const [nome, setNome] = useState("");
  const [posicaoSelecionada, setPosicaoSelecionada] = useState("");
  const [ano, setAno] = useState("");
  const [imagem, setImagem] = useState(null);
  const RefImagemInput = useRef(null);

  const posicao = {
    masculino: [
      "Goleiro",
      "Lateral-Direito",
      "Lateral-Esquerdo",
      "Zagueiro",
      "Meia",
      "Atacante",
    ],
    feminino: [
      "Goleira",
      "Lateral-Direita",
      "Lateral-Esquerda",
      "Zagueira",
      "Meia",
      "Atacante",
    ],
  };

  const aoEnvioDoFormulario = async (evento) => {
    evento.preventDefault();

    const AnoNumero = parseInt(ano.trim(), 10);
    if (isNaN(AnoNumero) || AnoNumero < 1910 || AnoNumero > 2025) {
      alert("Insira um ano entre 1910 e 2025.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("posicaoSelecionada", posicaoSelecionada);
    formData.append("ano", ano);
    formData.append("genero", genero);
    formData.append("imagem", imagem);

    try {
      const response = await fetch("http://localhost:5001/jogadores", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar jogador");
      }

      const data = await response.json();
      aoJogadorCadastrado(data.jogador);

      setNome("");
      setPosicaoSelecionada("");
      setAno("");
      setImagem(null);

      if (RefImagemInput.current) {
        RefImagemInput.current.value = "";
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <section className="formulario">
      <form onSubmit={aoEnvioDoFormulario}>
        <h1>
          {genero === "masculino"
            ? "CADASTRO DO JOGADOR"
            : "CADASTRO DA JOGADORA"}
        </h1>
        <CampoTexto
          label="NOME"
          obrigatorio={true}
          placeholder="Digite seu nome"
          valor={nome}
          aoAlterado={(valor) => setNome(valor)}
        />
        <ListaSuspensa
          label="POSIÇÃO"
          itens={posicao[genero]}
          obrigatorio={true}
          placeholder="Selecione a posição"
          valor={posicaoSelecionada}
          aoAlterado={(valor) => setPosicaoSelecionada(valor)}
        />
        <CampoTexto
          label="ANO"
          obrigatorio={true}
          valor={ano}
          placeholder="Digite o ano que jogou"
          aoAlterado={(valor) => setAno(valor)}
        />

        <CampoImagem
          label="IMAGEM"
          placeholder="Insira a imagem"
          valor={imagem}
          aoAlterado={(arquivo) => setImagem(arquivo)}
          ref={RefImagemInput}
        />

        <Botao />
      </form>
    </section>
  );
};

export default Formulario;
