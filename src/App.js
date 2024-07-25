import './App.css';
import { SelectComponent } from './components/SelectComponent/SelectComponent';
import { TableComponent } from './components/TableComponent/TableComponent';

function App() {
  return (
    <div className="App">
      <h1 className="title">Instituições de ensino por país</h1>
      <span>Faça aqui a sua busca</span>
      <div className="container">
          <h3>Lista de instituições</h3>
        <div>
          <p>Selecione o país</p>
          <SelectComponent></SelectComponent>
        </div>
      </div>
    </div>
  );
}

export default App;
