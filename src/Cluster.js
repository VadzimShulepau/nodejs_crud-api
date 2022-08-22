import cluster from "cluster";
import { cpus } from "os";
import 'dotenv/config';

const cpusLength = cpus().length;

if (cluster.isPrimary) {

  for (let i = 0; i < cpusLength; i++) {
    cluster.fork();
  };

  // cluster.on('exit', (worker, code, signal) => {
  //   cluster.fork();
  // });
} else {
  await import('./Server.js');
  console.log(`Worker ${cluster.worker.id} for ${process.pid}`);
};