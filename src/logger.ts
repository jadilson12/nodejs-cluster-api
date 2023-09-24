import pino from "pino";

const Logger = pino({
  disabled: !!process.env.NOLOG,
  minLength: 4096, // Buffer before writing
  sync: false, // Asynchronous logging,
  level: process.env.PINO_LOG_LEVEL || "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "dd-mm-yyyy HH:MM:ss.l",
    },
  },
});

export { Logger };
