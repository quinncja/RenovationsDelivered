import { useMemo } from "react";
import Userfront from "@userfront/core";

function useIsAdmin() {
  const isAdmin = useMemo(() => {
    if (Userfront && Userfront.user) {
      return Userfront.user.hasRole("admin");
    }
    return false;
  }, []);

  return isAdmin;
}

export default useIsAdmin;
