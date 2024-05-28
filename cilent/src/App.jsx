import { BrowserRouter,Routes,Route } from 'react-router-dom';
import React from 'react'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignUp';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return <BrowserRouter>
<header/>
  <Routes>
    <Route path="/" element={< Home/>}/>
    <Route path="/sign-in" element={< SignIn/>}/>
    <Route path="/sign-up" element={< SignUp/>}/>
    <Route path="/about" element={< About/>}/>
    <Route element={<PrivateRoute/>}>
      {/* the profile should be activated when the user is authunticated */}
    <Route path="/profile" element={< Profile/>}/>
    </Route>
  </Routes>
   
   </BrowserRouter>;
  
}
