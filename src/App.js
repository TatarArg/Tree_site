import React, { useState } from "react";
import './CSS/App.css';
import trees from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';

function App() {
  const [filteredData, setFilteredData] = useState(trees);

  return (
    <div className="App">
      <h3>Самые высокие деревья</h3>
      <Chart data={filteredData} />
      <Table data={trees} amountRows="10" filtering={setFilteredData} />
    </div>
  );
}

export default App;
