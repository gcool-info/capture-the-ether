import dotenv from "dotenv";
dotenv.config(); // load env vars from .env
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

const { ARCHIVE_URL, PRIVATE_KEY_1, PRIVATE_KEY_2 } = process.env;

if (!ARCHIVE_URL)
  throw new Error(
    `ARCHIVE_URL env var not set. Copy .env.template to .env and set the env var`
  );
if (!PRIVATE_KEY_1)
  throw new Error(
    `PRIVATE_KEY_1 env var not set. Copy .env.template to .env and set the env var`
  );
if (!PRIVATE_KEY_2)
  throw new Error(
    `PRIVATE_KEY_2 env var not set. Copy .env.template to .env and set the env var`
  );

// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      // old ethernaut compiler
      { version: "0.4.21" },
      { version: "0.7.3" }
    ],
  },
  networks: {
    ropsten: {
      url: ARCHIVE_URL,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2],
      gas: 2100000,
      gasPrice: 8000000000
    },
  },
  mocha: {
    timeout: 300 * 1e3,
  }
};

export default config;
