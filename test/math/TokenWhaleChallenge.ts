import { ethers } from "hardhat";
import { Contract, BigNumber } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";

let contract: Contract;

before(async () => {
    contract = await getContract("TokenWhaleChallenge", "0xb35fE8bc0b68122F6BF581fd7C7532Ea4cCdBCE4", ethers.utils.parseEther("0"))
});

it("solves the challenge", async function () {


    // const buyTx = await contract.buy(tokens, {
    //     value: eth,
    // });
    // const buyTxHash = buyTx && buyTx.hash
    // expect(buyTxHash).to.not.be.undefined


    // const isComplete = await contract.isComplete()
    // expect(isComplete).to.be.true;
});