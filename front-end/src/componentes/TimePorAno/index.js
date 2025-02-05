import "./timePorAno.css";
import Jogador from "../Jogador";



const TimePorAno = (props) => {
 
  return (
    <section className="time">
      <h3>{props.ano}</h3>
      <div className="jogadores">
        {props.jogadores.map((jogador,index) => (
          <Jogador
            key={index}
            nome={jogador.nome}
            posicaoSelecionada={jogador.posicaoSelecionada}
            imagem={jogador.imagem}
            ano={jogador.ano}
          />
        ))}
      </div>
    </section>
  );
};

export default TimePorAno;
