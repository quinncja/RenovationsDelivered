import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Userfront, { LoginForm } from "@userfront/toolkit/react";
import logo from "./images/Full-Logo-White.png";
Userfront.init("xbpwwqmn");

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if(Userfront.user.userUuid) {
      navigate("/dashboard")
    }
  }, [navigate])

  return (
    <div className="home">
      <img src={logo} className="logo" alt="Renovations Delivered" />
      <LoginForm
          theme={{
            colors: {
              light: "#ffffff",
              dark: "#f7941d",
              accent: "#f7a848",
              lightBackground: "#fdfdfd",
              darkBackground: "#2d2d2d",
            },
            colorScheme: "dark",
            fontFamily: "Avenir, Helvetica, Arial, sans-serif",
            size: "default",
            extras: { hideSecuredMessage: true },
          }}
        />
    </div>
  );
}

export default Home;
