import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router'

//layouts
import PublicLayout from './Layout/PublicLayout'
import AdminLayout from './Layout/AdminLayout'

//pages
import Home from './Pages/Home/Home'
import Branches from './Pages/Branches/Branches'
import Finance from './Pages/Finance/Finance'


//admin pages
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
//admin pages protected routes
import ProtectedRoutes from './Components/ProtectedRoutes'
import NewZones from './Admin/NewZones/NewZones'
import NewBranches from './Admin/NewBranches/NewBranches'
import NewServices from './Admin/NewServices/NewServices'
import NewFinances from './Admin/NewFinances/NewFinances'

function App() {


  return (
    <>
      
      <Routes>


       
        <Route element={<Login/>} path='/Login'/>
        <Route element={<Register/>} path='/Register'/> 
        
        <Route element={<PublicLayout/>}>
          <Route element={<Home/>} path='/'/>
          <Route element={<Branches/>} path='/Branches'/>
          <Route element={<Finance/>} path='/Finance'/>
          
        </Route>

 {/* this section is accessible to anyone having link to website */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AdminLayout />}>
            <Route element={<NewZones />} path="/NewZones" />
            <Route element={<NewBranches />} path="/NewBranches" />
            <Route element={<NewServices />} path="/NewServices" />
            <Route element={<NewFinances />} path="/NewFinances" />
          </Route>
        </Route>


        {/* this is reserved to admin */}
      </Routes>
      
    </>
  )
}

export default App
