export type Friend = {
    id: number;
    name: string;
    lastName: string;
    online: boolean;
  };
  
  // Dummy "baza podataka" 
  const friendsDb: Friend[] = [
    { id: 1, name: "Ivan", lastName: "Ivanić", online: true },
    { id: 2, name: "Ana", lastName: "Anić", online: false },
    { id: 3, name: "Marko", lastName: "Marić", online: true },
    { id: 4, name: "Petra", lastName: "Petrić", online: true },
  ];
  
  // Fake async fetch 
  export async function getActiveFriends(): Promise<Friend[]> {
    // simulacija kašnjenja mreže
    await new Promise(resolve => setTimeout(resolve, 300));
  
  
    return friendsDb.filter(friend => friend.online);
  }
  