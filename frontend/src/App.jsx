import './App.scss';

import { ChakraProvider } from "@chakra-ui/react"
import {  Route, Switch, BrowserRouter as Router } from "react-router-dom";

import {Home,Detail,NotFound} from './pages/'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}>
            <Home/>
          </Route>
          <Route path="/book" component={Detail}>
            <Detail/>
          </Route>
          <Route path="*" component={NotFound}>
            <NotFound/>
          </Route>
        </Switch>
      </Router>

    </ChakraProvider>
  );
}

export default App;
