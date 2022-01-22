import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const LoginDoctor=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const useFormFields=(state)=>{
        const [fields, setFields]=useState(state)
        return [
            fields,
            (event)=>{
                setFields({...fields,[event.target.id]:event.target.value})
            }
        ]
    }
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
      });
    const submit=()=>{
        //dispatch to store here
    }
    return(
        <div>
            
        <h1>This is Login</h1>
        <label>email</label>
        <input type={"text"} id={"email"} onChange={handleFieldChange}></input>
        <label>password</label>
        <input type={"password"} id={"password"} onChange={handleFieldChange}></input>
        <button onClick={submit}>Log In</button>
        </div>
    )
}