import React from "react"
import ReactDOM from "react-dom"
import App from "./components/app"
import { Provider } from "react-redux"
import ErrorBoundry from "./components/error-boundry"
import { BoardServiceProvider } from "./utils/board-service-contexts"
import BoardServices from "./services/board-services"

import store from "./store"
import { BrowserRouter as Router } from "react-router-dom"

const boardService = new BoardServices()


ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BoardServiceProvider value={boardService}>
        <Router>
          <App />
        </Router>
      </BoardServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
)
