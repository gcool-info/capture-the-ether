# capture-the-ether

Solutions to [capture-the-ether CTF](https://capturetheether.com/).

## Development

```bash
npm i
```

You need to configure environment variables:

```bash
cp .env.template .env
# fill out
```

- Add the `PRIVATE_KEY` of your [metamask](https://metamask.io/) demo account.
- Add the link to your [Alchemy](https://www.alchemy.com/) project at `ARCHIVE_URL`

#### Hardhat

This repo uses [hardhat](https://hardhat.org/) to run the CTF challenges.
Challenges are implemented as hardhat tests in [`/test`](./test).

#### Running challenges

```bash
# run locally
npx hardhat test test/warmup/CallMeChallenge.ts
# once everything works, run all txs on ropsten testnet to gain points
npx hardhat test test/warmup/CallMeChallenge.ts --network ropsten
```
