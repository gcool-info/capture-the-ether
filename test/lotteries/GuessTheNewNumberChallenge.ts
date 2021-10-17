import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let attackContract: Contract;

before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const challengeFactory = await ethers.getContractFactory("GuessTheNewNumberChallenge")
    let challengeContract;

    const network = await (await ethers.provider.getNetwork()).name
    if (network === "ropsten") {
        challengeContract = challengeFactory.attach(`0x01c48700020A604D72E4B31734a9c7444CCa4D49`)
    } else {
        challengeContract = await challengeFactory.deploy({
            value: ethers.utils.parseEther("1"),
        });
    }

    const attackFactory = await ethers.getContractFactory("GuessTheNewNumberChallengeAttack")
    attackContract = await attackFactory.deploy(challengeContract.address)
});

it("solves the challenge", async () => {
    const tx = await attackContract.attack({
        value: ethers.utils.parseEther("1.3"),
    });

    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined
});