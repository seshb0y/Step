import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Users from '../pages/Users'
// import Info from '../pages/Info'

const Users = lazy(() => import('../pages/Users'))
const Info = lazy(() => import('../pages/Info'))

const Navigation = () => {
  return (
    <div>
        <Suspense fallback={<h1>Loading.....</h1>}>
            <Routes>
                <Route path='/' element={<Users/>} />
                <Route path='/:userId' element={<Info/>}/>
            </Routes>
        </Suspense>
    </div>
  )
}

export default Navigation