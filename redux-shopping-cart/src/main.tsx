import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App";
import { Theme } from "./app/context"

ReactDOM.render(
  <React.StrictMode>
    <Theme.Provider value={1}>
      <Provider store={store} >
        <App />
      </Provider>
    </Theme.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
