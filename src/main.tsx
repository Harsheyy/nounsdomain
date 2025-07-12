import { Provider } from "@/components/ui/provider";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider>
        <App />
        <Analytics />
      </Provider>
  </StrictMode>
)
