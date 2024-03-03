import Login from "./components/login/login.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

function MultiRoute(el, ...paths) {
  return paths.map((p) => <Route key={p} element={el} path={p} />);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {
        /*<Routes>
        <Route>
          {MultiRoute(<Login />, "/", "/signup", "/company-signup", "/login")}
        </Route>
      </Routes>*/
      }
      <App />
    </Router>
  </React.StrictMode>,
);
