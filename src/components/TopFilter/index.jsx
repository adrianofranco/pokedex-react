export const TopFilter = ({ inputOnBlur, inputOnChange, perpage }) => (
  <div className="top">
    <h2>Filtros</h2>
    <div>
      <label>
        Iniciar no pokémon de nº{" "}
        <input type="text" onBlur={inputOnBlur} />
      </label>
    </div>
    <div>
      <label>
        Quantos itens por vez?
        <select value={perpage} onChange={inputOnChange}>
          <option></option>
          <option value="0">selecione</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  </div>
);
