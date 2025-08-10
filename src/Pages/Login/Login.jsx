import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios'

import './Login.css'
const Login = () => {
    const [values,setvalues] = useState({
        username:'',
        userpwd:''
    })

    const handlechanges=(e)=>{
        setvalues({...values,[e.target.name]:e.target.value})
    }

    const handlesubmit =(e)=>{
        e.preventDefault()
        axios.post('',values)
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }
  return (
    <div className='login_container'>
        <div className='login_wrapper'>
            <form action="" onSubmit={handlesubmit} >
                <div className='login_title'>
                    Se Connecter
                </div>

                <div className='login_inputbox'>
                    <input type="text" placeholder="Nom D'utilizateur" required name='username' onChange={handlechanges}/>
                    <i className="bx  bx-user"></i> 
                </div>

                <div className='login_inputbox'>
                    <input type="text" placeholder="Mot De Passe" required name='userpwd' onChange={handlechanges}/>
                    <i className='bx  bx-lock-open'></i> 
                </div>


                <button className='login_submit'>Soumettre</button>

                <div className='login_gotologin'>
                    <NavLink to={"/Register"}>
                        Creer Un Compte 
                    </NavLink>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login