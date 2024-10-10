import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position='bottom-right' toastOptions={{
        className: "shadow-xl px-2 py-1 text-base rounded-full",
        success: {
          icon: "✨"
        },
        error: {
          icon: "🚫"
        }
      }} />
      <App />
    </Provider>
  </StrictMode>,
)
