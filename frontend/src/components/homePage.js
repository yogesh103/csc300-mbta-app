import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import getUserInfo from '../utilities/decodeJwt'
const HomePage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }

    useEffect(() => {
        setUser(getUserInfo())
    }, [])


    if (!user) return (<div><h3>You are not authorized to view this page, Please Login in <Link to={'/login'}><a href='#'>here</a></Link></h3></div>)
    const { id, email, username, password } = user
    return (
        <>
            <div>
                <h3>
                    Welcome
                    <span className='username'> @{username}</span>
                </h3>
                <h3>
                    Your userId in mongo db is
                    <span className='userId'> {id}</span>
                </h3>
                <h3>
                    Your registered email is
                    <span className='email'> {email}</span>
                </h3>
                <h3>
                    Your password is
                    <span className='password'> {password} ( hashed )</span>
                </h3>
            </div>
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
        </>
    )
}

export default HomePage