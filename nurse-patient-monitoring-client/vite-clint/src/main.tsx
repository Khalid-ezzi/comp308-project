import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from 'react-router-dom'
import Router from './Router.tsx'
import { ApolloProvider } from '@apollo/client';
import client from './services/apolloClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Router />  
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
