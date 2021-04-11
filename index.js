import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'

import App from './app'

const renderApp = ()=> {
  console.log("reload")
  refreshWordSets()
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  ReactDOM.render(<App />, document.getElementById('root'))
}
global.renderApp = renderApp;

ReactDOM.render(<App />, document.getElementById('root'))