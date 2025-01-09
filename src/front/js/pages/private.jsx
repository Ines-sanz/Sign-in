import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = ( ) =>{
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('token'))navigate('/')
    },[])

    return(
        <div>
            <h2>Vista privada</h2>
        </div>
    )
}