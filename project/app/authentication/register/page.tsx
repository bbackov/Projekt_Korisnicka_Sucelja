"use client";

import { useState } from "react";
import { registerValidation } from "@/app/util/registerValidation";
import { useRouter } from "next/navigation";


export default function Page() {
   
  const [registerInfo,setRegisterInfo] =useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message,setMessage]=useState("");
  const [showModal ,setModal]=useState(false);
  const [valid,setValid]= useState(false);
  const router=useRouter();

  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=event.target;

    setRegisterInfo(prev=>({
      ...prev,
      [name]:value
    }));

  }

  const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const result=registerValidation(registerInfo);
    setValid(result.valid);

      if(result.valid){
        setMessage("Uspješna registracija");
        setModal(true);
      }
      else{
        setMessage(result.error);
        setModal(true);
      }
      return;
    }
  
  const handleModal=()=>{
    setModal(false);
    if(valid){
      router.push("/authentication/login");
    }

  }


  return(
    <div>
      <h1>Registracija</h1>

      <form onSubmit={handleSubmit} noValidate>
        <input name="firstName" type="text" placeholder="Ime" onChange={handleChange}/>
        <input name="lastName"type="text" placeholder="Prezime" onChange={handleChange}/>
        <input name="email" type="email" placeholder="Email" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Lozinka" onChange={handleChange}/>
        <input name="confirmPassword" type="password" placeholder="Ponovi lozinku" onChange={handleChange}/>

        <button type="submit">Registriraj se</button>
      </form>

      {showModal && (
        <div>
          <h1>{message}</h1>
          <button onClick={handleModal}>Nastavi</button>
        </div>
      )}
    </div>
  );

}