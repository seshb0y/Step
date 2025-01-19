import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import NavBar from '../components/NavBar'
import styles from '../styles/FoodPage.module.css';

const Lunch = () => {
    
    const {food} = useSelector((state: RootState) => state.food)

  return (
    <div className={styles.container} style={{backgroundColor: food[2].theme}}>
      <NavBar />
      <h1 className={styles.title}>{food[2].name}</h1>
      <div className={styles.details}>
        <h2>Price: {food[2].price}</h2>
        <h2>Description: {food[2].description}</h2>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={food[2].image} alt={food[2].name} />
      </div>
    </div>
  )
}

export default Lunch