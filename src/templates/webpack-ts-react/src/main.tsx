import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const MOUNT_NODE_ID = '#app'
const MOUNT_NODE = document.querySelector(MOUNT_NODE_ID)

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE)
}

render()
