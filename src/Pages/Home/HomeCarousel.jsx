import React, { useState } from 'react';
import evan from '../../images/evangelisation.png';
import bible_teachig from '../../images/bible_teaching.png';
import saintscene from '../../images/saintscene.png';
import batheme from '../../images/batheme.png';
import marriage from '../../images/marriage.png'

const objectifs = [
  {
    description: "Evangélisation",
    image: evan,
  },
  {
    description: "Baptême",
    image: batheme,
  },
  {
    description: "Sainte Cène",
    image: saintscene,
  },
  {
    description: "Enseignement",
    image: bible_teachig,
  },
  {
    description: "Marriage",
    image:marriage
  }
];

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const sliderStyles = {
    height: "500px", // give it some height
    width: "100%",
    position: "relative",
    overflow: "hidden",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
     backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${objectifs[currentIndex].image})`,
    transition: "background-image 0.5s ease-in-out",
  };

  const leftArrow ={
    position: 'absolute',
    top: '50%',
    transform: 'translate(0,-50%)',
    left:'32px',
    fontSize:'60px',
    color: '#fff',
    zIndex:1,
    cursor: "pointer",
  };

  const rightArrow ={
    position: 'absolute',
    top: '50%',
    transform: 'translate(0,-50%)',
    right:'32px',
    fontSize:'60px',
    color: '#fff',
    zIndex:1,
    cursor: "pointer",
  };

    const goToPrevious = ()=>{
        const isFirstSlide = currentIndex ===0
        const newIndex = isFirstSlide ? objectifs.length-1: currentIndex-1;
        setCurrentIndex(newIndex)
    };

    const goToNext = ()=>{
        const isLastSlide = currentIndex ===objectifs.length-1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // const dotsContainerStyles = {
    //     display:'flex',
    //     justifyContent:'center',

    //     position: 'absolute',
    //     top: '80%',
    //     left:"40%",
    // };

    // const dotStyles = {
    //     margin: '5px',
    //     cursor: 'pointer',
    //     fontSize: '54px',
    //     color: '#fff'
    // };

    // const goToSlide = (objectifindex) =>{
    //     setCurrentIndex(objectifindex)
    // };

    const overlayText = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      fontWeight: "bolder",
      fontSize: "2rem",
      textAlign: "center",
      zIndex: 2,
    };

  return (
    <div style={sliderStyles}>
        <div style={leftArrow} onClick={goToPrevious}>˂</div>
        <div style={rightArrow} onClick={goToNext}>˃</div>
        <div style={slideStyles}></div>
        {/* <div style={dotsContainerStyles}>
            {objectifs.map((objectif,objectifindex)=>(
                <div key={objectifindex} style={dotStyles} 
                onClick={()=>goToSlide(objectifindex)}>•</div>
            ))}
        </div> */}
        <div style={overlayText}>
          {objectifs[currentIndex].description}
        </div>
    </div>
  );
};

export default HomeCarousel;
