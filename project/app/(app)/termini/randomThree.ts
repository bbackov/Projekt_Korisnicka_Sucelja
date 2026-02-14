
import { SportDogadjaj } from "./data";
import { SPORT_DOGADJAJI } from "./data";

export async function RandomThree(): Promise<SportDogadjaj[]>{

    await new Promise(resolve => setTimeout(resolve, 300));

    const filterdSports=SPORT_DOGADJAJI.filter((sport)=>{
        return sport.kapacitet!==sport.prijavljeno;
    })
    
    return [...filterdSports].sort(() => Math.random() - 0.5).slice(0,3);
}