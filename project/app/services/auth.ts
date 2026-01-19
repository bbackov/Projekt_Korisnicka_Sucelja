const dummyUsers = [
    {
      firstName: "Ivan",
      lastName: "Horvat",
      email: "ivan.horvat@test.com",
      password: "Password123",
    },
    {
      firstName: "Ana",
      lastName: "Kovač",
      email: "ana.kovac@test.com",
      password: "Password123",
    },
    {
      firstName: "Marko",
      lastName: "Marić",
      email: "marko.maric@test.com",
      password: "Password123",
    },
    {
      firstName: "Petra",
      lastName: "Novak",
      email: "petra.novak@test.com",
      password: "Password123",
    },
    {
      firstName: "Luka",
      lastName: "Babić",
      email: "luka.babic@test.com",
      password: "Password123",
    },
    {
        firstName: "a",
        lastName: "a",
        email: "a@test.com",
        password: "Password123",
      },
  ];

type RegisterData={
    firstName:string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  };

type RegiserResult= | {success:true}
                    | {success:false, error:string};

type LoginData={
    email: string,
    password: string
  };

type LoginResult= | {success:true}
                    | {success:false, error:string};
                    
export function RegisterUser(data:RegisterData):Promise<RegiserResult>{

    return new Promise((resolve)=>{
        setTimeout(()=> {
            for (let user of dummyUsers) {
                if (user.email === data.email) {
                    resolve({success:false,error:"Email vec postioji"});
                    return;
                }
              }
         
            resolve({success:true});
            
        },1000);
    });
}

export function LoginUser (data:LoginData):Promise<LoginResult>{

    return new Promise((resolve)=>{
        setTimeout(()=> {
            for(let user of dummyUsers){
                if(user.email===data.email && user.password===data.password){
                    resolve({success:true});
                    return;
                }
            }
            resolve({success:false,error:"Email ili lozinka su krivi"});
        },1000);
    });
}