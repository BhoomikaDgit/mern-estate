import { BrowserRouter,Routes,Route } from 'react-router-dom';
import React from 'react'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignUp';
import About from './pages/About';

export default function App() {
  return <BrowserRouter>
<header/>
  <Routes>
    <Route path="/" element={< Home/>}/>
    <Route path="/sign-in" element={< SignIn/>}/>
    <Route path="/sign-up" element={< SignUp/>}/>
    <Route path="/about" element={< About/>}/>
    <Route path="/profile" element={< Profile/>}/>
  </Routes>
   
   </BrowserRouter>;
  
}