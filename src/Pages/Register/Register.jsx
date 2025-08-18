import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    useremail: '',
    userpwd: '',
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('https://sevt-backend.onrender.com/users', values);
    if (res.status === 201) {
      alert('Compte créé avec succès ✅');
      setValues({ username: '', useremail: '', userpwd: '' });
    }
  } catch (err) {
    console.error(err);
    if (err.response?.status === 403) {
      alert("Ce compte administrateur existe déjà ❌");
    } else {
      alert(err.response?.data?.message || "Erreur lors de l'inscription ❌");
    }
  }
};


  return (
    <div className='register_container'>
      <div className='register_wrapper'>
        <form onSubmit={handleSubmit}>
          <div className='register_title'>Créer un Compte</div>

          <input type="text" name="username" placeholder="Nom d'utilisateur" required value={values.username} onChange={handleChanges} />
          <input type="text" name="useremail" placeholder="Email" required value={values.useremail} onChange={handleChanges} />
          <input type="password" name="userpwd" placeholder="Mot de Passe" required value={values.userpwd} onChange={handleChanges} />

          <button type="submit">Soumettre</button>

          <div className='register_gotologin'>
            <NavLink to="/Login">Vous avez un compte ?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
