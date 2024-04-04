import Userfront from "@userfront/toolkit/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Userfront.user.uuid) navigate("/");
  }, [navigate]);

  return <h1> Welcome {Userfront.user.name} </h1>;
}

export default Dashboard;
