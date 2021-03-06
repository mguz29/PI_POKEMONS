import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from "./components/Landing"
import Home from "./components/Home"
import pokemonCreate from './components/PokemonCreate';
import PokemonDetail from './components/PokemonDetail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/Home' component={Home} />
          <Route exact path='/Pokemon' component={pokemonCreate} />
          <Route exact path='/pokemons/:id' component={PokemonDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
