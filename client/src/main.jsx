import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthPage from './pages/AuthPage.jsx'
import Navbar from './components/base/Navbar.jsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Navbar />
    <AuthPage />
  </ChakraProvider>,
)
