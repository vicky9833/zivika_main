import { env } from "./config/env";
import { logger } from "./lib/logger";
import { db } from "./lib/db";
import { createApp } from "./app";

async function main() {
  await db.init();
  const app = createApp();
  app.listen(env.port, () => {
    logger.info({ msg: "server ready", port: env.port });
  });
}

main().catch((e) => {
  logger.error({ err: e });
  process.exit(1);
});
