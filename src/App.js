import './App.css';
import FoodList from './components/FoodList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Authentication from './components/Authentication';
import AuthContext from "./components/context/auth-context";
import HomePage from './components/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Col, Container, ListGroup, Row } from 'react-bootstrap';

//TODO: Criar exclusão de pratos (sem chamar API, somente com os pratos em memória)
//TODO: Criar cadastro de pratos (sem chamar API, somente com os pratos em memória)
//TODO: Estilizar rating e botões de ação

export default function App() {
  return (
    <AuthContext.Context>
        <Router>
          <Container>
            <Row>
              <Col>
                <ListGroup horizontal>
                  <ListGroup.Item><Link to="/">Home</Link></ListGroup.Item>
                  <ListGroup.Item><Link to="/foods">Foods</Link></ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm>
                <Authentication/>
              </Col>
            </Row>
          </Container>
          
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/foods">
              <FoodList/>
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
      </Router>
    </AuthContext.Context>
  );
};
