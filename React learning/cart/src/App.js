import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./Components/Navbar";
import store from "./store/store";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/Cart">
            <Cart />
          </Route>
        </Switch>

      </Provider>
    </div>
  );
}

export default App;
