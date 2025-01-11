import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import styles from '../modules/Components.module.css'
import { useNavigate, useParams } from 'react-router-dom'

const UserInfo = () => {
    const {userId} = useParams();

    useEffect(() => {
        getUserInfo(Number(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // const {Id} = useParams();

    const context = useContext(UserContext)

    if(!context){
        throw new Error('UserContext is required')
    }

    const {selectedPost, selectedUser, getUserInfo} = context;

    console.log(selectedPost);
    console.log(selectedUser)
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

  return (
    <div className={styles.userInfoContainer}>
            {selectedUser ? (
            Object.entries(selectedUser).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return (
                <div key={key}>
                    <h4>{key}:</h4>
                    <div>
                    {Object.entries(value).map(([subKey, subValue]) => {
                        if (typeof subValue === 'object' && subValue !== null) {
                        return (
                            <div key={subKey}>
                            <h5>{subKey}:</h5>
                            <div>
                                {Object.entries(subValue).map(([deepKey, deepValue]) => (
                                <p key={deepKey}>
                                    {deepKey}: {deepValue}
                                </p>
                                ))}
                            </div>
                            </div>
                        );
                        }
                        return (
                        <p key={subKey}>
                            {subKey}: {subValue}
                        </p>
                        );
                    })}
                    </div>
                </div>
                );
            }
            return (
                <p key={key}>
                {key}: {value}
                </p>
            );
            })
        ) : (
            <h1>Loading...</h1>
        )}
        {selectedPost ? (Object.entries(selectedPost).map(([key, value]) => (
            <p>{key}: {value}</p>
        )))
        :
        (<h1>Loading....</h1>)}
        <button onClick={handleBack}>Back</button>
    </div>
  )
}

export default UserInfo