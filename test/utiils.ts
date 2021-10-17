import { Contract, BigNumber } from "ethers";
import { ethers } from "hardhat";

export async function getContract(name: string, address: string, value: BigNumber): Promise<Contract> {
    const accounts = await ethers.getSigners();
    const eoa = accounts[0];
    const challengeFactory = await ethers.getContractFactory(name)

    const network = await (await ethers.provider.getNetwork()).name
    if (network === "ropsten") {
        return challengeFactory.attach(address)
    } else {
        return challengeFactory.deploy({
            value, //ethers.utils.parseEther("1"),
        });
    }
}