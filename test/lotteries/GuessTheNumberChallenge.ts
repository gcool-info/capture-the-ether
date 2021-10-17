import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";

let contract: Contract; // challenge contract

before(async () => {
    contract = await getContract("GuessTheNumberChallenge", "0x826fC89961E0CFEC5949d81Db56d1a363e4bF29E", ethers.utils.parseEther("1"))
});

it("solves the challenge", async function () {
    const tx = await contract.guess(42, {
        value: ethers.utils.parseEther("1"),
    });

    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined

    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});