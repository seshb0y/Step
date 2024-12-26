import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'




const User = () => {

    const [isShawn, setIsShawn] = useState(false)

    const shawn = (event: React.MouseEvent) => {
        setIsShawn(true)
    }

    const context = useAuth();

    const rendData = (context:UserActivation) => {
        return(
            <div>
                <p>{context.id}</p>
                <p>{context.email}</p>
                <p>{context.password}</p>
                <p>{context.name}</p>
                <p>{context.role}</p>
                <p>{context.avatar}</p>
            </div>
        )
    }

  return (
    <div>
        <button onClick={shawn}>click</button>
        {isShawn && rendData(context)}
    </div>
  )
}

export default User