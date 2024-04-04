import Userfront from "@userfront/toolkit/react";
import Navbar from "./Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <h1> Welcome {Userfront.user.name} </h1>
    </>
  );
}

export default Dashboard;
