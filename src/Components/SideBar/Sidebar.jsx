import React from 'react'
import {useState,useEffect} from 'react'
import {NavLink,useLocation} from 'react-router-dom';

import "./Sidebar.css"

function Sidebar() {

  const location = useLocation();
  const [activeMenu,setActiveMenu] = useState("");
  
  const menuItems = [
    {name:"Acceuil",path:'/'},
    {name:"Nouvelle Zone",path:'/NewZones'},
    {name: "Nouvelle Branche", path:'/NewBranches'},
    {name:"Nouvelle Finance",path:'/NewFinances'},
    {name:"Nouveau Service",path:'/NewServices'}
  
  ];

  useEffect(()=>{
      const currentPath = location.pathname;
      const activeItem = menuItems.find(item=>item.path ===currentPath)
      if(activeItem){
        setActiveMenu(activeItem.name);
      }
    },[location,menuItems]);


  return (
    <div className='side-wrapper'>
          <div className='side-branding'>
            <span className='side-logo-name'>SEVT</span>
            <img className='side-logo-image'/>
          </div>
          <div className='side-menu' >
            
            {menuItems.map(item=>(
              
              <NavLink key={item.name} to={item.path} onClick={()=>setActiveMenu(item.name)} 
              className = {`side-menu-item ${activeMenu ===item.name ? 'side-active': ''}`}>
                  <span>{item.name}</span>
              </NavLink>
            ))}
        
          </div>
        </div>
  )
}

export default Sidebar