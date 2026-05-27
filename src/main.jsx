import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1A2E',
              color: '#FEFAF5',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            },
            success: { iconTheme: { primary: '#10B981', secondary: '#FEFAF5' } },
            error: { iconTheme: { primary: '#EF4444', secondary: '#FEFAF5' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)