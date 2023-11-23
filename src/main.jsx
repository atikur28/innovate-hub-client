import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import createdRouter from './mainLayout/MainLayout'
import AuthProvider from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={createdRouter} /></AuthProvider>
  </React.StrictMode>,
)
