import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      //do not refetch when switch windows
      refetchOnWindowFocus: false,
    },
  }, 
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Provide the client to your App*/}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
