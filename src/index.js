import React from "react";
import ReactDOM from "react-dom";
import App from "./components/Feed";
import { Provider } from "./context";
import "./theme/base.scss";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
