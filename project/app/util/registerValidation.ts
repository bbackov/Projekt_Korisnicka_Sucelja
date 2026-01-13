type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

export function registerValidation(data:RegisterData) {
    const emailRegex = /.+@.+\..+/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const maxLen=100;
  
    if (data.firstName==="") {
      return {valid:false,error:"Unesi ime"};
    }
  
    if (data.lastName === "") {
      return {valid:false,error:"Unesi prezime"};
    }
  
    if (!emailRegex.test(data.email)) {
      return {valid:false,error:"Neispravan email" };
    }
  
    if (!passwordRegex.test(data.password)) {
      return {valid:false,error:"Lozinka mora imati barem 8 znakova, jedno veliko slovo i broj"};
    }
  
    if (data.password !== data.confirmPassword) {
      return {valid:false,error:"Lozinke se ne podudaraju"};
    }

    if(data.firstName.length>maxLen || data.lastName.length>maxLen || data.email.length>maxLen || data.password.length>maxLen || data.confirmPassword.length>maxLen){
        return {valid:false,error:"Jedno od polja premašuje dopuštenu duljinu"}
    }
  
    return {valid:true,error:""};
  }