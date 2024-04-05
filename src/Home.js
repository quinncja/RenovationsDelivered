import React, { useState } from "react";
import Userfront, { SignupForm, LoginForm } from "@userfront/toolkit/react";
import logo from "./images/Full-Logo-White.png";
Userfront.init("xbpwwqmn");

function Home() {
  const [formState, setForm] = useState(1);
  const forms = [
    {
      form: (
        <SignupForm
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
      ),
      text: "Or, log in",
    },
    {
      form: (
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
      ),
      text: "Or, sign up",
    },
  ];

  return (
    <div className="home">
      <img src={logo} className="logo" alt="Renovations Delivered" />
      {forms[formState].form}
      <button
        className="btn btn-secondary"
        onClick={() => setForm(formState === 0 ? 1 : 0)}
      >
        {" "}
        {forms[formState].text}{" "}
      </button>
    </div>
  );
}

export default Home;
