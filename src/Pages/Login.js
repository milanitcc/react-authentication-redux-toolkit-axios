import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    // states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // redux state
    const {loading, error} = useSelector((state)=>state.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        let userCredential = {
            username, password
        }

        dispatch(loginUser(userCredential)).then((result) => {
            if( result.payload )
            {
                setUsername('');
                setPassword('');
                navigate('/');
            }
        })
    }

  return (
    <form className='form-group custom-form' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
            className='form-control'
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
        />
        <br/>
        <label>Password</label>
        <input
            className='form-control'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
        />
        <br/>
        <button
            className='btn btn-success btn-md'
            type='submit'
        >
            {loading ? 'Loading...' : 'Login'}
        </button>
        {error && (
            <div className='alert alert-danger' role='alert'>{error}</div>
        )}
    </form>
  )
}

export default Login