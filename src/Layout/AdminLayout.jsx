import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../Components/SideBar/Sidebar'

function AdminLayout() {
  return (
    <>
        <Sidebar/>
        <Outlet/>
    </>
  )
}

export default AdminLayout