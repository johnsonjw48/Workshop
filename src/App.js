import './App.css';
import  Eleves from './Component/Eleves'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/eleve">Eleve</Link>
            </li>
            <li>
              <Link to="/ecole">Ecole</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/eleve">
           <Eleves/>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
