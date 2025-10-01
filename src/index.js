const cluster = require("cluster");
const os = require("os");
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

const myIp = process.env.BACKEND_IP;
const numCPUs = os.cpus().length;

// ✅ MASTER PROCESS
if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running with ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger.info(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

// ✅ WORKER PROCESSES
} else {
  mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info(`Worker ${process.pid} connected to MongoDB`);

    const server = app.listen(config.port, myIp, () => {
      logger.info(`Worker ${process.pid} running at http://${myIp}:${config.port}`);
    });

    // ✅ OPTIONAL: SOCKET.IO SUPPORT
    // const socketIo = require("socket.io");
    // const socketIO = require("./utils/socketIO");
    // const io = socketIo(server, {
    //   cors: {
    //     origin: "*",
    //   },
    // });
    // socketIO(io);
    // global.io = io;

    const exitHandler = () => {
      server.close(() => {
        logger.info(`Worker ${process.pid} closed`);
        process.exit(1);
      });
    };

    const unexpectedErrorHandler = (error) => {
      logger.error(error);
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
      logger.info(`Worker ${process.pid} received SIGTERM`);
      server.close();
    });

  }).catch((err) => {
    logger.error(`MongoDB connection failed in worker ${process.pid}: ${err}`);
    process.exit(1);
  });
}
