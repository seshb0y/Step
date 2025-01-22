// import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import NavBar from '../components/NavBar'
import styles from '../styles/FoodPage.module.css';
import { useState } from 'react';

const Breakfast = () => {
  
    const [isNext, setIsNext] = useState(true)
    const [currentProductIndex, setCurrentProductIndex] = useState(0);

    const {food, isLoading} = useSelector((state: RootState) => state.food)

    const handleNextProduct = () => {
      setIsNext(!isNext); 
      setCurrentProductIndex(isNext ? 0 : 2); 
    }
  return (
    isLoading ? (<h1>Loading</h1>) : (
      <div className={styles.container}>
      <NavBar />
      <h1 className={styles.title} style={{color: food[currentProductIndex].theme}}>{food[currentProductIndex].name}</h1>
      <div className={styles.infoContainer}>
        <div className={styles.details}>
          <h2 style={{color: food[currentProductIndex].theme}}>${food[currentProductIndex].price}</h2>
          <h3 style={{color: food[currentProductIndex].theme}}>{food[currentProductIndex].description}</h3>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={food[currentProductIndex].image} alt={food[currentProductIndex].name} />
        </div>
      </div>
      <div className={styles.buttons}>
          <button style={{background: food[currentProductIndex].theme}} className={styles.buttonLeft} onClick={handleNextProduct}>
            <img className={styles.changeButtonImage}  src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-left-256.png" alt="" />
          </button>
          <button style={{background: food[currentProductIndex].theme}} className={styles.buttonRight} onClick={handleNextProduct}>
            <img className={styles.changeButtonImage} src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-right-64.png" alt="" />
          </button>
      </div>
    </div>
    )
  )
}

export default Breakfast