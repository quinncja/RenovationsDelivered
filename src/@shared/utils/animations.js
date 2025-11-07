export const itemFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

export function overlayVariants(color, open) {
  return {
    hidden: { backgroundColor: "#00000000" },
    visible: { backgroundColor: color, transition: { duration: open ?? 0 } },
    exit: { backgroundColor: "#00000000", transition: { duration: 0 } },
  };
}
