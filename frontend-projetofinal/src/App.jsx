import { Routes, Route } from 'react-router-dom';
import PessoaList from "./components/PessoaList";
import PessoaForm from "./components/PessoaForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PessoaList />} />
        <Route path="/cadastro" element={<PessoaForm />} />
      </Routes>
    </div>
  );
}

export default App;

