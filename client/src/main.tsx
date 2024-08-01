import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './store/store';
import { SocketProvider } from './contexts/SocketContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <SocketProvider>
      <App />
      <Toaster closeButton />
    </SocketProvider>

  </Provider>
)
