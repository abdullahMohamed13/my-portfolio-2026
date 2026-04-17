import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner';

import './styles/index.css'
import Home from './pages/Home.tsx'
import ResumePage from './pages/Resume.tsx'
import Layout from './layouts/Layout.tsx';
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'resume',
        element: <ResumePage />
      }
    ]
  }
])

const toasterStyle: React.CSSProperties & Record<string, string> = {
  "--normal-bg": "var(--accent)",
  "--normal-text": "#ffffff",
  "--normal-border": "var(--accent)",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router}/>
    </HelmetProvider>
    <Toaster style={toasterStyle} duration={4500}/>
  </StrictMode>,
)
