import { NavLink, Route, Routes } from 'react-router-dom'
import ShowCaseList from './ShowCaseList'
import BasketList from './BasketList'
import styles from './styles.module.css'

const Navigation = () => {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <NavLink to={'/'}>Show case</NavLink>
          <NavLink to={'/basket'}>Basket</NavLink>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<ShowCaseList />} />
        <Route path='/basket' element={<BasketList />} />
      </Routes>
    </div>
  )
}

export default Navigation
