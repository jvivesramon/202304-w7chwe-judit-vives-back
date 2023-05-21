import "./loadEnviroment.js";
import createDebug from "debug";
import chalk from "chalk";
import app from "./server/index.js";
import connectToDatabase from "./database/connectDatabase.js";

const debug = createDebug("isdinetwork-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION;

const localhost = `http://localhost:${port}`;

if (!mongoDbConnection) {
  debug(chalk.red(`Missing enviroment variables`));
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening on ${chalk.bgBlueBright(localhost)}`);
});

try {
  await connectToDatabase(mongoDbConnection);

  debug(chalk.green("Connected to database"));
} catch (error: unknown) {
  debug(`Error connecting to database: ${chalk.red((error as Error).message)}`);
}
