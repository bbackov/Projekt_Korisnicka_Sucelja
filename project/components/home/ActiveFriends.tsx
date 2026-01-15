"use client";

import { useEffect, useState } from "react";
import { getActiveFriends } from "@/data/friends";
import type { Friend } from "@/data/friends";
import Card from "../common/ui/Card";
import styles from "./ActiveFriends.module.css"

export default function ActiveFriends() {
  
  const [friends, setFriends] = useState<Friend[]>([]);

 
  useEffect(() => {
    
    const loadFriends = async () => {
      const activeFriends = await getActiveFriends();
      setFriends(activeFriends);
    };

    loadFriends();
  }, []);

  return (
    <Card title="Online prijatelji">

      <ul className={styles.list}>
        {friends.map(friend => (
          <li key={friend.id} className={styles.item}>
              <div className={styles.avatar}>
                {friend.name.charAt(0)}
              </div>

              <span className={styles.name}>
                {friend.name}
              </span>

              <span className={styles.status}>
                online
              </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}