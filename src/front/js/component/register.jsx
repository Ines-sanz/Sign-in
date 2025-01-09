import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext';

export const Register = () =>{
    const {store, actions} = useContext(Context);
    const [formData, setformData]= useState({
        email: '',
        password: ''
    });
    const handleChange = e => setformData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = e =>{
        e.preventDefault()
        actions.register(formData)
    }

    return (
    <form onSubmit={handleSubmit} className="form-control" >
        <input type="text" className="form-control" onChange={handleChange} name="email" placeholder='email'/>
        <input type="password" className="form-control" onChange={handleChange} name="password" placeholder='password'/>
        <input type="submit" value='register' />
    </form>
    )   
}