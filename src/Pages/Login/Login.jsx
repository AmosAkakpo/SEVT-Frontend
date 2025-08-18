import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [values, setValues] = useState({ username: '', userpwd: '' });
  const navigate = useNavigate();

  const handleChanges = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Check login using the backend
    const res = await axios.post('https://sevt-backend.onrender.com/users/login', values);

    if (res.status === 200) {
      localStorage.setItem('isAdmin', true);       
      localStorage.setItem('loginTime', Date.now()); 
      navigate('/NewBranches'); 
    }
  } catch (err) {
    console.error(err);
    alert('Nom d’utilisateur ou mot de passe incorrect');
  }
};

  return (
    <div className='login_container'>
      <div className='login_wrapper'>
        <form onSubmit={handleSubmit}>
          <div className='login_title'>Se Connecter</div>
          <input type="text" name="username" placeholder="Nom d'utilisateur" required onChange={handleChanges} />
          <input type="password" name="userpwd" placeholder="Mot de passe" required onChange={handleChanges} />
          <button type="submit">Soumettre</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
