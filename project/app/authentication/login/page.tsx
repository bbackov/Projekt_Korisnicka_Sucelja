"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginValidation } from "@/util/loginValidation";



export default function Page() {
  
  const router=useRouter();
  const [loginInfo,setLoginInfo]=useState({
    email:"",
    password:"",
  });

  const [valid,setValid]=useState(false);
  const [message,setMessage]=useState("");
  const [showModal,setModal]=useState(false);

  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=event.target;

    setLoginInfo(prev=>({
      ...prev,
      [name]:value
    }));
  }

  const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const result=loginValidation(loginInfo);

    setValid(result.valid);

    if(result.valid){
      setMessage("Uspješni login");
    }
    else{
      setMessage(result.error);
    }
    setModal(true);
    
    return;
  }

  const handleModal=()=>{
    setModal(false);
    if(valid){
      router.push("/");
    }
    return; 
  }

  return(
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <input name="email" type="email" placeholder="email" onChange={handleChange}/>
        <input name="password" type="password" placeholder="lozinka" onChange={handleChange}/>

        <button>Prijavi se</button>
      </form>

      {showModal && (
        <div>
          <h1>{message}</h1>
          <button onClick={handleModal}>Nastavi</button>
        </div>
      )}
    </div>
  )

}