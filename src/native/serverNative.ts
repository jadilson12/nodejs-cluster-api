import http from "node:http";
import { Logger } from "../lib/logger";

export default class ServerNative {
  static start() {
    const server = http.createServer((request, response) => {
      for (let index = 0; index < 1e7; index++);
      response.end(`handled by pid: ${process.pid}`);
    });

    server.listen(3000).once("listening", () => {
      Logger.info("Server started in process", process.pid);
    });

    // aguardar as conexoes serem encerradas para só então encerrar o programa
    process.on("SIGTERM", () => {
      Logger.info("server ending", new Date().toISOString());
      server.close(() => process.exit());
    });

    // vamos simular que um erro aleatorio aconteceu
    setTimeout(() => {
      process.exit(1);
    }, Math.random() * 1e4);
  }
}
