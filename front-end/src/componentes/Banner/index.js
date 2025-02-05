import "./Banner.css";
import React, { Fragment } from "react";

const Banner = ({genero, aoGeneroAlterado}) => {
  return (
    <header className="banner">
      <img className="banner-listras" src="/imagens/listras.png" alt="banner" />
      <div className="container-banner-titulo">
        <h1>VAI CORINTHIANS!!!</h1>
        <div className="banner-opcao-genero">
          <button 
            className={genero === "masculino" ? "active" : ""}
            onClick={() => aoGeneroAlterado("masculino")}
          >
            MASCULINO
          </button>
          
          <p className="banner-opcao-genero">|</p>
          
          <button
           className={genero === "feminino" ? "active" : ""}
           onClick={() => aoGeneroAlterado("feminino")}
            
          >
            FEMININO
          </button>
        </div>
      </div>

      <div className="container-banner-descricao">
        {/* <p className="banner-descricao">
          Aplicação feita para organizar os jogadores e jogadoras que fizeram
          parte da história do Corinthians!
        </p> */}
      </div>
      <img className="simbolo-corinthians" src="/imagens/corinthians-1.png" />
    </header>
  );
};

export default Banner;
