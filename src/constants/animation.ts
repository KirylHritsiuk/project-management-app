export const pageAnimation = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const textAnimation = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: (custom = 1) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export const imgAnimation = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: (custom = 1) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export const text = {
  init: { opacity: 0, scale: 0.5 },
  anim: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } },
};

export const card = {
  init: { opacity: 0, scale: 0.5 },
  anim: (custom = 1) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: custom * 0.2 },
  }),
  exit: { opacity: 0, scale: 0.5, transition: { duration: 1 } },
  hover: { scale: 1.07 },
  tab: { scale: 1.07 },
};
