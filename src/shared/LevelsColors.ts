type PredefinedKeys =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "info"
  | "error";

const colorsListObject: Record<PredefinedKeys, string> = {
  primary: "#8C0327",
  secondary: "#D75050",
  accent: "#DCBDFF",
  success: "#489380",
  info: "#41ABB9",
  error: "#E01A2E",
};

const levelColors = {
  primary: {
    completed: {
      container: "completed",
      content: "bg-primary text-primary-content active:bg-primary/90",
    },
    studying: {
      container:
        "studying border-primary border-4 rounded-3xl active:border-primary-content",
      content:
        "bg-primary-content text-primary active:bg-primary active:text-primary-content",
      gradientProgress: (progressPorcent: number) =>
        `conic-gradient(${colorsListObject.primary} ${progressPorcent}%,#F2F2F2 ${progressPorcent}%)`,
    },
  },
  secondary: {
    completed: {
      container: "completed",
      content: "bg-secondary text-secondary-content active:bg-secondary/90",
    },
    studying: {
      container:
        "studying border-secondary border-4 rounded-3xl active:border-secondary-content",
      content:
        "bg-secondary-content text-secondary active:bg-secondary active:text-secondary-content",
      gradientProgress: (progressPorcent: number) =>
        `conic-gradient(${colorsListObject.secondary} ${progressPorcent}%,#F2F2F2 ${progressPorcent}%)`,
    },
  },
  accent: {
    completed: {
      container: "completed",
      content: "bg-accent text-accent-content active:bg-accent/90",
    },
    studying: {
      container:
        "studying border-accent border-4 rounded-3xl active:border-accent-content",
      content:
        "bg-accent-content text-accent active:bg-accent active:text-accent-content",
      gradientProgress: (progressPorcent: number) =>
        `conic-gradient(${colorsListObject.accent} ${progressPorcent}%,#F2F2F2 ${progressPorcent}%)`,
    },
  },
  success: {
    completed: {
      container: "completed",
      content: "bg-success text-success-content active:bg-success/90",
    },
    studying: {
      container:
        "studying border-success border-4 rounded-3xl active:border-success-content",
      content:
        "bg-success-content text-success active:bg-success active:text-success-content",
      gradientProgress: (progressPorcent: number) =>
        `conic-gradient(${colorsListObject.success} ${progressPorcent}%,#F2F2F2 ${progressPorcent}%)`,
    },
  },
  info: {
    completed: {
      container: "completed",
      content: "bg-info text-info-content active:bg-info/90",
    },
    studying: {
      container:
        "studying border-info border-4 rounded-3xl active:border-info-content",
      content:
        "bg-info-content text-info active:bg-info active:text-info-content",
      gradientProgress: (progressPorcent: number) =>
        `conic-gradient(${colorsListObject.info} ${progressPorcent}%,#F2F2F2 ${progressPorcent}%)`,
    },
  },
  error: {
    completed: {
      container: "completed",
      content: "bg-error text-error-content active:bg-error/90",
    },
    studying: {
      container:
        "studying border-error border-4 rounded-3xl active:border-error-content",
      content:
        "bg-error-content text-error active:bg-error active:text-error-content",
      gradientProgress: (progressPorcent: number) =>
        `conic-gradient(${colorsListObject.error} ${progressPorcent}%,#F2F2F2 ${progressPorcent}%)`,
    },
  },
};

export { levelColors, colorsListObject, type PredefinedKeys };
