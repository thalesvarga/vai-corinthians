import "./jogador.css"


function corDeFundoPorAno(ano) {
    const anoInicio = 1910;
    const ultimoAno = 2025;
    const factor = Math.min(Math.max((ano - anoInicio) / (ultimoAno - anoInicio), 0), 1);
    const r = Math.round(192 + factor * (255 - 192));
    const g = Math.round(192 + factor * (255 - 192));
    const b = Math.round(192 + factor * (255 - 192));
    return `rgb(${r}, ${g}, ${b})`;
  }
  

const Jogador = (props) => {
    const baseCor = corDeFundoPorAno(Number(props.ano));
    const gradient = `linear-gradient(to bottom, ${baseCor}, #dfdfdf)`;
    
    const cardJogadorFundoPorAno = {
        background: gradient,
      }
    return( <div className="jogador"style={cardJogadorFundoPorAno}>
        <div className="cabecalho" >
            <img src={props.imagem} alt={props.nome} />
        </div>
        <div className="rodape">
            <h4>{props.nome}</h4>
            <h5>{props.posicaoSelecionada}</h5>
        </div>
        </div>
    )
}

export default Jogador