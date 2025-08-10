import React, { useState } from 'react'
import './Register.css'
import { NavLink, useLocation } from 'react-router-dom';

const Register = () => {
    
    const [values,setvalues] = useState({
        username:'',
        useremail:'',
        userpwd:'',
    })

    const handlechanges=(e)=>{
        setvalues({...values,[e.target.name]:e.target.value})
    }

    async function handlesubmit(e){
        e.preventDefault()
        let response = await Register(values)
        if(response!==200){
            alert("User Account Could not be created :(")
        }
    }
    console.log(values)
  return (
    <div className='register_container'>
        <div className='register_wrapper'>
            <form action="" onSubmit={handlesubmit} >
                <div className='register_title'>
                    Creer Un Compte
                </div>

                <div className='register_inputbox'>
                    <input type="text" placeholder="Nom D'utilizateur" required name='username' onChange={handlechanges}/>
                    <i className="bx  bx-user"></i> 
                </div>
                <div className='register_inputbox'>
                    <input type="text" placeholder="Email" required name='useremail' onChange={handlechanges}/>
                    <i className='bx  bx-envelope-open'  ></i> 
                </div>
                <div className='register_inputbox'>
                    <input type="password" placeholder="Mot De Passe" required name='userpwd' onChange={handlechanges}/>
                    <i className='bx  bx-lock-open'  ></i> 
                </div>

                <button className='register_submit'>Soumettre</button>

                <div className='register_gotologin'>
                    <NavLink to={"/Login"}>
                        Vous Avez un compte? 
                    </NavLink>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register