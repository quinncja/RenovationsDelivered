export const toolItemsFadeIn = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.08,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const dropDownFadeIn = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12 + 0.1,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

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
    visible: { backgroundColor: color, transition: { duration: open ?? 0.3 } },
    exit: { backgroundColor: "#00000000", transition: { duration: 0.4 } },
  };
}

export const settingWidgetVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

export const newWidgetPopupVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    top: 0,
    scale: 1,
    width: "fit-content",
    height: "fit-content",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

export const toggleVariants = {
  dark: {
    x: 0,
  },
  light: {
    x: "calc(100% + 3px)",
  },
};

export const smartSortVariants = {
  true: {
    x: 0,
  },
  false: {
    x: "calc(100% + 3px)",
  },
};

export const labelVariants = {
  never: {
    x: 0,
  },
  open: {
    x: "calc(97% + 3px)",
  },
  always: {
    x: "calc(205% + 3px)",
  },
};

export const dropdownVariants = {
  initial: {
    width: "59px",
    height: "56px",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  expanded: {
    width: "150px",
    height: "max-content",
    paddingBottom: "20px",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export const topbarVariants = {
  initial: {
    width: "68px",
    height: "60px",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  expanded: {
    width: "68px",
    height: "max-content",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    width: "68px",
    height: "60px",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const undoVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transformOrigin: "center",
  },
  visible: {
    opacity: 1,
    scale: 1,
    transformOrigin: "center",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    width: "1px",
    height: "1px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const newWidgetButtonVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transformOrigin: "center",
  },
  visible: {
    opacity: 1,
    scale: 1,
    transformOrigin: "center",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    width: "1px",
    height: "1px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const undoSVGVariants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: -360,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

export const redoSVGVariants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

export const widgetItemsFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.05,
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

export const buttonsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

export const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};
