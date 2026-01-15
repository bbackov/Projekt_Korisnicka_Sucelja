type LoginData = {
    email: string;
    password: string;
  };

export function loginValidation(data:LoginData) {
    const emailRegex = /.+@.+\..+/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const maxLen=100;
  
    if (!emailRegex.test(data.email)) {
      return {valid:false,error:"Neispravan email" };
    }
  
    if (!passwordRegex.test(data.password)) {
      return {valid:false,error:"Lozinka mora imati barem 8 znakova, jedno veliko slovo i broj"};
    }
  

    if(data.email.length>maxLen || data.password.length>maxLen){
        return {valid:false,error:"Jedno od polja premašuje dopuštenu duljinu"}
    }
  
    return {valid:true,error:""};
  }