import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";
import { TIMEOUT } from "dns";
import { time } from "console";

let challengeContract: Contract;
let attackContract: Contract;

before(async () => {
    const challengeFactory = await ethers.getContractFactory("PredictTheFutureChallenge")
    challengeContract = await challengeFactory.deploy({ value: ethers.utils.parseEther("1") })

    const attackFactory = await ethers.getContractFactory("PredictTheFutureChallengeAttack")
    attackContract = await attackFactory.deploy(challengeContract.address)
});

it("solves the challenge", async () => {
    const txLock = await attackContract.lockInGuessAttack({
        value: ethers.utils.parseEther("1"),
    });

    const txHashLock = txLock && txLock.hash
    expect(txHashLock).to.not.be.undefined

    let isComplete;
    do {
        await attackContract.settleAttack();
        await ethers.provider.send('evm_mine', []);

        isComplete = await challengeContract.isComplete()
    } while (!isComplete)
});