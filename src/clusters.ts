import os from "node:os";

import cluster from "cluster";
import { Logger } from "./lib/logger";

export default class Clusters {
  static clustmize(callback: () => void) {
    if (cluster.isPrimary) {
      const processesCount = os.cpus().length;
      Logger.info(`Primary ${process.pid} is running`);
      Logger.info(`Forking Server with ${processesCount} processes \n`);

      for (let index = 0; index < processesCount; index++) cluster.fork();

      cluster.on("exit", (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
          Logger.info(
            `Worker ${worker.process.pid} died... scheduling another one!`
          );
          cluster.fork();
        }
      });
    } else {
      callback();
    }
  }
}
