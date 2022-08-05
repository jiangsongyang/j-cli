import { createRoot } from 'react'
import App from './App'

const MOUNT_NODE_ID = '#app'
const MOUNT_NODE = document.querySelector(MOUNT_NODE_ID)

const root = createRoot(MOUNT_NODE)

const bootStrap = () => {
  root.render(<App />, MOUNT_NODE)
}

bootStrap()
