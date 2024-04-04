import Userfront from "@userfront/toolkit/react";


function Dashboard() {
  return <h1> Welcome {Userfront.user.name} </h1>;
}

export default Dashboard;
