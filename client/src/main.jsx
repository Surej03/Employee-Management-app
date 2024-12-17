import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './Context/Context.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider>
  <App/>
  </Provider>
  </BrowserRouter>
)
