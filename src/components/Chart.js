import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Тип");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("Точечная диаграмма");
  const [hasOyError, setHasOyError] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOx = event.target["ox"].value;
    const newOy = [
      event.target["oy"][0].checked,
      event.target["oy"][1].checked
    ];
    const newType = event.target["type"].value;

    if (!newOy[0] && !newOy[1]) {
      setHasOyError(true); 
      return;
    }

    setHasOyError(false); 
    setOx(newOx);
    setOy(newOy);
    setChartType(newType);
  };

  const handleCheckboxFocus = () => {
    setHasOyError(false); 
  };

  const createArrGraph = (data, key) => {
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];

    for (let entry of groupObj) {
      const heights = entry[1].map(d => d['Высота, м']);
      let minMax = d3.extent(heights);
      arrGraph.push({ labelX: entry[0], values: minMax });
    }

    if (["Год", "Продолжительность жизни, лет"].includes(key)) {
      arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    return arrGraph;
  };

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p>Значение по оси OX:</p>
        <div>
          <input type="radio" name="ox" value="Тип" defaultChecked /> Тип <br />
          <input type="radio" name="ox" value="Континент" /> Континент <br />
          <input type="radio" name="ox" value="Продолжительность жизни, лет" /> Продолжительность жизни
        </div>

        <p>Значение по оси OY:</p>
        <div id="oY" className={hasOyError ? "errorText" : ""}>
          <input type="checkbox" name="oy" defaultChecked onFocus={handleCheckboxFocus} /> Максимальная высота <br />
          <input type="checkbox" name="oy" onFocus={handleCheckboxFocus} /> Минимальная высота
        </div>

        <p>
          <label>Тип диаграммы:</label>
          <select name="type">
            <option>Точечная диаграмма</option>
            <option>Гистограмма</option>
          </select>
        </p>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      <ChartDraw
        data={createArrGraph(props.data, ox)}
        oy={oy}
        chartType={chartType}
      />
    </>
  );
};

export default Chart;
