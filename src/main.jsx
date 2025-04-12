import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Approuter from './components/Approuter.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={Approuter}/>
  </StrictMode>,
)
