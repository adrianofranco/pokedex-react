export const TopFilter = ({inputOnChange, perpage }) => (
  <div className="top">
    <h2>Filtros</h2>
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
);
