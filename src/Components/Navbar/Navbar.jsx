import React from 'react'
import "./Navbar.css"
import {useState,useEffect} from 'react'
import {NavLink,useLocation} from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [activeMenu,setActiveMenu] = useState("");

  const menuItems = [
    {name:"Acceuil",path:'/'},
    {name: "Nos Branches", path:'/Branches'},
    {name:"Finance",path:'/Finance'},
    {name:"Se Connecter", path:'/Login'}
  ];

  useEffect(()=>{
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item=>item.path ===currentPath)
    if(activeItem){
      setActiveMenu(activeItem.name);
    }
  },[location,menuItems]);

  return (

    <div className='nav-wrapper'>
      <div className='nav-branding'>
        <span className='nav-logo-name'>SEVT</span>
        <img className='nav-logo-image'/>
      </div>
      <div className='nav-menu' >
        
        {menuItems.map(item=>(
          
          <NavLink key={item.name} to={item.path} onClick={()=>setActiveMenu(item.name)} 
          className = {`nav-menu-item ${activeMenu ===item.name ? 'nav-active': ''}`}>
              <span>{item.name}</span>
          </NavLink>
        ))}
    
      </div>
    </div>
    
  )
}

export default Navbar