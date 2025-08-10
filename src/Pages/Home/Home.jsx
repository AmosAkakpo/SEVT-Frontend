import React, { useEffect,useState } from 'react'
import './Home.css'
import axios  from "axios"


import HomeCarousel from './homecarousel'


const Home = () => {

  const [branches,setBranches] = useState()

  useEffect(()=>{
    async function grabBranches(){
      const response = await  axios.get("https://sevt-backend.onrender.com/branches")
      if (response.status ===200){
        setBranches(response.data)
      }
    }

    grabBranches()
  },[])
  return (
    <div className='home-wrapper'>
      <HomeCarousel/>

      <div className='home-content-1'>
        <h1>L'Appartenance à l'Église : Clé de la Croissance Spirituelle</h1>
        <p>Tout Celui qui est sauvé en Christ, doit appartenir à une église locale pour sa croissance, parce qu'on ne devient pas mature au lendemain de sa conversion. Dans <span className='verse'>Matthieu 16:18</span>  <span className='verse-text'>Jésus Christ a dit :...et sur cette pierre je bâtirai mon église et les portes du séjour des morts ne prévaudront point contre elle</span> </p>
  
        <p>L'apôtre Paul démontre ce qu'est une l'église locale en cinq étapes qui en constituent les cinq piliers, notamment <span className='highlight'>l'évangélisation, l'enseignement, la célébration de la sainte Cène, le baptême et la célébration du mariage.</span> Ce sont les cinq étapes d'activités qui permettent à l'église d'atteindre les objectifs divins</p>
      </div>

      <div>
        <div className="home-branches-content">
          <h2 className="home-branches-intro">
            Voici Certaine nos branches ou vous pouvez nour joindre:
          </h2>
          <table className="home-branch-table">
            <thead>
              <tr>
                <th>Nom De Branche</th>
                <th>Type De Branche</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {branches && branches.length > 0 ? (
                branches.map((item, index) => (
                  <tr key={index}>
                    <td>{item.branchName}</td>
                    <td>{item.branchType}</td>
                    <td>{item.branchLocation}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Chargement des branches...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home