import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "./AppRouter";

//Redux
import { createClientStore } from "./store";
import { Provider } from "react-redux";

import './App.scss';

const store = createClientStore({});

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <AppRouter />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
