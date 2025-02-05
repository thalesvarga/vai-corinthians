import { useState,useEffect } from "react";
import "./App.css";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import TimePorAno from "./componentes/TimePorAno";
import Rodape from "./componentes/Rodape";

function App() {
  const [jogadores, setJogadores] = useState([]);
  const [genero, setGenero] = useState("masculino");

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const response = await fetch("http://localhost:5001/jogadores");
        const data = await response.json();
        setJogadores([...data.masculino, ...data.feminino]);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      }
    };
  
    fetchJogadores();
  }, []);
  
 

  const aoNovoJogadorAdicionado = (jogador) => {
    console.log(jogador);
    setJogadores([...jogadores, jogador]);
  };

  const jogadoresFiltrados = jogadores.filter((jogador) => jogador.genero === genero )

  const JogadoresPorAno = jogadoresFiltrados.reduce((grupo, jogador) => {
    if (!grupo[jogador.ano]) {
      grupo[jogador.ano] = [];
    }
    grupo[jogador.ano].push(jogador);
    return grupo;
  }, {});

  return (
    <div className="App">
      <Banner genero={genero} aoGeneroAlterado={setGenero} />
      <Formulario
        aoJogadorCadastrado={aoNovoJogadorAdicionado}
        genero={genero}
        // aoSalvar={handleSalvar}
      />
      {Object.keys(JogadoresPorAno).map((ano) => (
        <TimePorAno key={ano} ano={ano} jogadores={JogadoresPorAno[ano]} />
      ))}
      <Rodape />
    </div>
  );
}

export default App;
