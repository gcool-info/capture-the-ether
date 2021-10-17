import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";

let contract: Contract;

let getAnswerByBruteForce = () => {
    const wantHash = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365";
    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
        const gotash = ethers.utils.keccak256([i])
        if (wantHash === gotash) {
            return i;
        }
    }
}

before(async () => {
    contract = await getContract("GuessTheSecretNumberChallenge", "0x89c575bdf6e611E4e5173fd9ceBAad41C9b95374")
});

it("solves the challenge", async () => {
    const answer = getAnswerByBruteForce();
    const tx = await contract.guess(answer, {
        value: ethers.utils.parseEther("1"),
    });

    const txHash = tx && tx.hash
    expect(txHash).to.not.be.undefined

    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});