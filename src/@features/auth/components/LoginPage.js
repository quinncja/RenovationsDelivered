import { LoginForm, useUserfront } from "@userfront/react";
import logo from "@assets/images/Full-Logo-White.png";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserfront();

  if (isAuthenticated) {
    navigate("/dashboard");
  }

  return (
    <div className="home">
      <img src={logo} className="logo" alt="Renovations Delivered" />
      <LoginForm
        theme={{
          colors: {
            light: "#ffffff",
            dark: "#f7941d",
            accent: "#f7a848",
            lightBackground: "#fefefe",
            darkBackground: "#161b22",
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

export default LoginPage;
