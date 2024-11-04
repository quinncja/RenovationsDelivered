import { useEffect, useState } from "react";
import { fetchUserList } from "utils/api";

export function Team(){ 
    const [users, setUsers] = useState();

    useEffect(() => {
        const loadUsers = async () => {
            const userData = await fetchUserList();
            console.log(userData)
        }

        loadUsers();
    }, [])
}

export default Team;