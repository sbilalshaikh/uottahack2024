import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthPage from './pages/AuthPage.jsx'
import Navbar from './components/base/Navbar.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route } from "react-router-dom"

import { BrowserRouter } from "react-router-dom";

import Root from "./routes/root";
import Community from './pages/Community.jsx';
import GreaterMap from './pages/GreaterMap.jsx';
import ImageUpload from './pages/ImageUpload.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={ <AuthPage/> } />
        <Route path="/community/:name" element={ <Community/> } />
        <Route path="/map" element={<GreaterMap />} />
        <Route path="/uploadPhoto" element={<ImageUpload />} />
    </Routes>
    </BrowserRouter>
  </ChakraProvider>,
)
