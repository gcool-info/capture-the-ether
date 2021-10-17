import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";
import { expect } from "chai";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const factory = await ethers.getContractFactory("CaptureTheEther")
    contract = factory.attach(`0x4491f37263720cD50221ddE50c5815bCa09F25b1`)
});

it("solves the challenge", async function () {
    const nickname = ethers.utils.formatBytes32String(`gcool-info`)
    const tx = await contract.setNickname(nickname);
    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined
});
