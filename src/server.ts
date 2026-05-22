import app from "./app.js";
import config from "./config/index.js";
import { initDb } from "./db/index.js";

const PORT = config.port || 3000;

const main = async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
