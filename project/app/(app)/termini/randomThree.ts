
import { SportDogadjaj } from "./data";
import { SPORT_DOGADJAJI } from "./data";

export async function RandomThree(): Promise<SportDogadjaj[]>{

    await new Promise(resolve => setTimeout(resolve, 300));

    
    return [...SPORT_DOGADJAJI].sort(() => Math.random() - 0.5).slice(0,3);
}