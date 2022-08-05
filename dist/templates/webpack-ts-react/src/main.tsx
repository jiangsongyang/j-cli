import ReactDOM from 'react-dom/client'
import { App } from './components'

const MOUNT_NODE_ID = 'app'

const root = document.getElementById(MOUNT_NODE_ID)

const bootstrap = () => {
  root && ReactDOM.createRoot(root).render(<App />)
}

bootstrap()
