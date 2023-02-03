const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();
    const governorAddress = "0xF1C148Ac699F4E8b4F1999AeBce19a997fBd9E9f";
    const tokenAddress = "0xf9C4f7736b3f3664Df4C11b809967C84e0408893";

    const governor = await ethers.getContractAt("MyGovernor", governorAddress);
    const token = await ethers.getContractAt("MyToken", tokenAddress);

    const tx = await governor.propose(
        [tokenAddress],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, ethers.utils.parseEther("25000")])],
        "Increase owner's token count!"
    );

    const receipt = await tx.wait();
    const event = receipt.events.find(x => x.event === 'ProposalCreated');
    const { proposalId } = event.args;


    console.log("receipt: ", receipt);
    console.log("events: ", event);
    console.log("proposal Id: ", proposalId);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });