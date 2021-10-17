import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";

let challengeContract: Contract;
let attackContract: Contract;

before(async () => {
    challengeContract = await getContract("GuessTheNewNumberChallenge", "0x01c48700020A604D72E4B31734a9c7444CCa4D49")

    const attackFactory = await ethers.getContractFactory("GuessTheNewNumberChallengeAttack")
    attackContract = await attackFactory.deploy(challengeContract.address)
});

it("solves the challenge", async () => {
    const tx = await attackContract.attack({
        value: ethers.utils.parseEther("1.3"),
    });

    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined

    const isComplete = await challengeContract.isComplete()
    expect(isComplete).to.be.true;
});