import "./campotexto.css";

const CampoTexto = (props) => {
  const placeholderModificado = `${props.placeholder}...`;

  let valor = "nome do jogador";

  const aoDigitado = (evento) => {
    props.aoAlterado(evento.target.value);
  };

  return (
    <div className="campo-texto">
      <label>{props.label}</label>
      <input
        value={props.valor}
        onChange={aoDigitado}
        required={props.obrigatorio}
        placeholder={placeholderModificado}
      />
    </div>
  );
};

export default CampoTexto;
