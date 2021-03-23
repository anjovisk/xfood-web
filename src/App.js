import './App.css';
import FoodList from './components/FoodList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Authentication from './components/Authentication';
import AuthContext from "./components/context/auth-context";

//TODO: Criar botão login/logout e atualizar auth-context (ainda que com dados fake)
//TODO: Criar popup com ações para alteração de status, exclusão e edição de pratos
//TODO: Permitir alteração de status de pratos (sem chamar API, somente com os pratos em memória)
//TODO: Criar exclusão de pratos (sem chamar API, somente com os pratos em memória)
//TODO: Criar cadastro de pratos (sem chamar API, somente com os pratos em memória)
//TODO: Estilizar rating e botões de ação

function App() {
  

  return (
    <AuthContext.Context>
      <div className="App">
        <Authentication/>
        <FoodList/>
      </div>
    </AuthContext.Context>
  );
}

export default App;
