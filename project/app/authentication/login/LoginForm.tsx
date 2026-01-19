"use client";

import { useState } from "react";
import { loginValidation } from "@/util/loginValidation";
import { LoginUser } from "@/app/services/auth";
import styles from "./LoginForm.module.css"


type Props={
    onSuccess:()=>void
};


export default function LoginForm({onSuccess}:Props) {

  const [loginInfo,setLoginInfo]=useState({
    email:"",
    password:"",
  });

  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");


  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=event.target;

    setLoginInfo(prev=>({
      ...prev,
      [name]:value
    }));
  }

  const handleSubmit= async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const resultValid=loginValidation(loginInfo);
    

    if(resultValid.valid){
      const result= await LoginUser(loginInfo);
      setLoading(false);
      if(!result.success){
        setMessage(result.error);
        return;
      }

    }
    else{
      setMessage(resultValid.error);
      setLoading(false);
      return;
    }
    
    onSuccess();
    return;
  }


  return(
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <input name="email" type="email" placeholder="email" onChange={handleChange} className={styles.input}/>
        <input name="password" type="password" placeholder="lozinka" onChange={handleChange} className={styles.input}/>

        {message && <p className={styles.error}>{message}</p>}

        <button type="submit" disabled={loading} className={styles.button}>{loading ? "Logiranje" : "Login"}</button>
      </form>
  )

}