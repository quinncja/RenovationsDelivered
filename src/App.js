import { Outlet } from "react-router-dom";
import Navbar from "@shared/components/Navbar/Navbar";
import Modal from "./@shared/components/Modal/Modal";
import SystemMessage from "./@shared/components/SystemMessage/SystemMessage";
import "./App.css";
import { Toaster } from "sonner";
import Footer from "@shared/components/Footer/Footer";
import { useAppInitializer } from "./@core/hooks/useAppInitializer";
import useScrollToTop from "@shared/hooks/useScrollToTop";
import logo from "@assets/images/R-Only-White.png";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "./@shared/components/Typewriter/Typewriter";
import { useState } from "react";
import { useUserfront } from "@userfront/react";
import LoginPage from "@features/auth/components/LoginPage";

function App() {
  const { isAuthenticated } = useUserfront();
  const { phase } = useAppInitializer(isAuthenticated);
  const [typingComplete, setTypingComplete] = useState(false);

  const shouldShowApp = phase === "ready" && typingComplete;
  const shouldShowLoading =
    isAuthenticated && (phase === "loading-critical" || !typingComplete);
  const shouldShowError = isAuthenticated && phase === "error";

  useScrollToTop();

  const loadingScreenStyle = {
    color: "white",
    width: "100vw",
    height: "100vh",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: "var(--background)",
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {shouldShowLoading && (
          <motion.div
            style={loadingScreenStyle}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img
              style={{ height: "150px", width: "150px" }}
              alt="Logo"
              src={logo}
            />
            <Typewriter
              text="Initializing ..."
              style={{ color: "white" }}
              onComplete={() => setTypingComplete(true)}
            />
          </motion.div>
        )}
        {shouldShowError && (
          <motion.div
            style={loadingScreenStyle}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              style={{ height: "150px", width: "150px" }}
              alt="Logo"
              src={logo}
            />
            <h3 style={{ color: "var(--red)" }}> Error initializing </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {shouldShowApp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <div className="App">
            <Navbar />
            <Outlet />
            <Modal />
            <Toaster richColors position="top-center" />
            <SystemMessage />
          </div>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
