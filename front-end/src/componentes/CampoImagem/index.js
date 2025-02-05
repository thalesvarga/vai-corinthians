import { forwardRef } from "react";
import "./campoimagem.css";

const CampoImagem = forwardRef ((props, ref) => {
  const aoArquivoSelecionado = (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
      props.aoAlterado(arquivo);
    }
  };

  return (
    <div className="campo-imagem">
      <label>{props.label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={aoArquivoSelecionado}
        required={props.obrigatorio}
        ref={ref}
      />
    </div>
  );
});

export default CampoImagem;
