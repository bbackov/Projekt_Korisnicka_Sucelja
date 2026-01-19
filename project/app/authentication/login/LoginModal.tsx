"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import styles from "./LoginModal.module.css"


export default function LoginModal(){

    const router=useRouter();

    const closeModal=()=>{
        router.back();
    }

    const handleSucces=()=>{
        router.push("/home");
    }

    return(
        <div className={styles.overlay}  onClick={closeModal}>
            <div className={styles.modal} onClick={(e)=>e.stopPropagation()} >
                <button className={styles.close} onClick={closeModal}>✕</button>
                <h2 className={styles.title}>Login</h2>
                <LoginForm onSuccess={handleSucces}/>
            </div>
        </div>
    )

}