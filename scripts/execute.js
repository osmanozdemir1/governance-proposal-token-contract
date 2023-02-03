const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;


async function main() {
    const [owner] = await ethers.getSigners();
    const governorAddress = "0xF1C148Ac699F4E8b4F1999AeBce19a997fBd9E9f";
    const tokenAddress = "0xf9C4f7736b3f3664Df4C11b809967C84e0408893";

    const governor = await ethers.getContractAt("MyGovernor", governorAddress);
    const token = await ethers.getContractAt("MyToken", tokenAddress);

    const tx = await governor.execute(
        [tokenAddress],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        keccak256(toUtf8Bytes("Increase owner's token count!")) 
    );


    console.log("tx: ", tx);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });