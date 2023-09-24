import cluster from "cluster";
import { Logger } from "./logger";

const runPrimaryProcess = () => {
  const processesCount = 12;
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
};

const runWorkerProcess = async () => {
  await import("./main");
};

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
