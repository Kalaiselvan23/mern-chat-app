import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    <Toaster closeButton/>

    </Provider>
  </React.StrictMode>,
)
