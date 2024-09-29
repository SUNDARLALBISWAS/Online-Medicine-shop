import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from '../Layout/Header/Header';
import Home from '../Component/Home/Home';
import Footer from '../Layout/Footer/Footer';
import AuthRegister from '../Component/AuthRegister/AuthRegister';
import AuthLogin from '../Component/AuthRegister/AuthLogin/AuthLogin';
import Addproduct from '../Component/Addproduct/Addproduct';
import Allmedicine from '../Component/Addproduct/Allmedicine/Allmedicine';
import Details from '../Component/Addproduct/Allmedicine/Details/Details';
import Pagenotfound from '../Component/PNF/Pagenotfound';
import Adminregister from '../Component/Adminregister/Adminregister';
import Profile from '../Component/AuthRegister/AuthLogin/Profile/Profile';
import ProtedRoutes from '../Authprotected/protect';
import Adminlogin from '../Component/Adminregister/Adminlogin/Adminlogin';
import Deshboard from '../Component/Adminregister/Adminlogin/Deshboard/Deshboard';
import Editpage from '../Component/Adminregister/Adminlogin/Deshboard/Editpage/Editpage';



const Routingpage = () => {
  return (
    <Router>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Sign-Up' element={<AuthRegister/>}/>
            <Route path='/Sign-In' element={<AuthLogin/>}/>

            <Route element={<ProtedRoutes/>}>
            <Route path='/Profileuser/:id' element={<Profile/>}/>
            </Route>
            <Route path='/Addproduct' element={<Addproduct/>}/>
            <Route path='/Allmedicine' element={<Allmedicine/>}/>
            <Route path='/Details/:id' element={<Details/>}/>
            <Route path='*' element={<Pagenotfound/>}/>
            <Route path='/Adminregister' element={<Adminregister/>}/>
            <Route path='/Adminlogin' element={<Adminlogin/>}/>
            <Route path='/Deshboard' element={<Deshboard/>}/>
            <Route path='/Editpage/:id' element={<Editpage/>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}
export default Routingpage;