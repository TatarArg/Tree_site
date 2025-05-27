import './CSS/App.css';
import trees from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Table data={ trees } amountRows="15" pagination={false}/>
    </div>
  );
}

export default App;