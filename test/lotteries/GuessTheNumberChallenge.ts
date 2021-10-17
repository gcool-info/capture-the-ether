import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const factory = await ethers.getContractFactory("GuessTheNumberChallenge")
    contract = factory.attach(`0x826fC89961E0CFEC5949d81Db56d1a363e4bF29E`)
});

it("solves the challenge", async function () {
    const tx = await contract.guess(42, {
        value: ethers.utils.parseEther("1"),
    });

    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined
});