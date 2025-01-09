import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Register = () =>{
    const {store, actions} = useContext(Context);
    const [formData, setformData]= useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    const handleChange = e => setformData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = e =>{
        e.preventDefault()
       if (actions.register(formData)) navigate('/private')
    }

    return (
    <form onSubmit={handleSubmit} className="form-control" >
        <input type="text" className="form-control" onChange={handleChange} name="email" placeholder='email'/>
        <input type="password" className="form-control" onChange={handleChange} name="password" placeholder='password'/>
        <input type="submit" value='register' disabled={localStorage.getItem('token')} />
    </form>
    )   
}