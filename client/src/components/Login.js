import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const initialUser = {
    username: '',
    password: ''
  }
  
  const [user, setUser] = useState(initialUser)

  const handleChanges = e => {
    const name = e.target.name
    const value = e.target.value
    setUser({...user, [name]: value})
  }

  const history = useHistory()
  
  const handleSubmit = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/login', user)
        .then(res => {
          window.localStorage.setItem('token', res.data.payload)
          history.push('/bubblePage')
        })
        .catch(err => console.log(err))
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
            <label> Username
                <input 
                type='text'
                name='username'
                value={user.username}
                onChange={handleChanges}
                />
            </label>
            <label> Password
                <input 
                type='password'
                name='password'
                value={user.password}
                onChange={handleChanges}
                />
            </label>
            <button onChange={handleChanges}>Login</button>
        </form>
    </>
  );
};

export default Login;
