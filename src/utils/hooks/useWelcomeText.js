import { useMemo } from "react";
import Userfront from "@userfront/toolkit";

const useWelcomeText = () => {
  const greeting = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();

    const name = Userfront.user.name;
    const firstName = name.trim().split(" ")[0];

    let greetingText;

    if (hours >= 0 && hours < 5) {
      greetingText = "Go to sleep";
    } else if (hours >= 5 && hours < 12) {
      greetingText = "Good morning";
    } else if (hours >= 12 && hours < 18) {
      greetingText = "Good afternoon";
    } else if (hours >= 18 && hours < 24) {
      greetingText = "Good evening";
    } else {
      greetingText = "Hello";
    }

    return firstName ? `${greetingText}, ${firstName}` : greetingText;
  }, []);

  return greeting;
};

export default useWelcomeText;
