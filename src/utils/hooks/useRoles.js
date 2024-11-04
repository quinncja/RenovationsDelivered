
import { useEffect } from "react";
import Userfront from "@userfront/toolkit/react";
import { initializeUserRole } from "utils/api";

const useRoles = (isAuthenticated) => {

  const hasRole = Userfront.user.hasRole('member');

  useEffect(() => {
    const setRoles = async () => {
      try {
        await initializeUserRole(Userfront.user.userId)
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    if (isAuthenticated && !hasRole) setRoles();
    //eslint-disable-next-line
  }, []);
};

export default useRoles;
