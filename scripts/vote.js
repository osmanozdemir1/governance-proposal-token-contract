const { ethers } = require("hardhat");

//propId: BigNumber { value: "101788281623723328781153058828557727775556146559917108177674523577667551316990" }
// new one: BigNumber { value: "58868354134425893198416918443813577308919354692045059192345302875706106987046" }

const proposalId = ethers.BigNumber.from("58868354134425893198416918443813577308919354692045059192345302875706106987046");

async function main() {
    const governorAddress = "0xF1C148Ac699F4E8b4F1999AeBce19a997fBd9E9f";

    const governor = await ethers.getContractAt("MyGovernor", governorAddress);

    const tx = await governor.castVote(proposalId, 1);

    console.log("tx: ", tx);
    console.log("propid: ", proposalId);

  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });