const { ethers } = require("hardhat");

//governor: 0x94BF06D1940Ae46eF2af11ce586E6544C1025f8B
// token: 0xfC9886C34d086872444De5C36183cbA4CFa3D817

//newgown: 0x458953c262DA5FC4A46fe364763f50D431739756
//newtoken: 0xb51E1Bb4aD7fffceDa1771007C84436539b0C36d

//lastgovn: 0xF1C148Ac699F4E8b4F1999AeBce19a997fBd9E9f
//lasttoken: 0xf9C4f7736b3f3664Df4C11b809967C84e0408893

async function main() {
  const [owner] = await ethers.getSigners();
  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  await token.delegate(owner.address);

  console.log(
    `Owner address ${owner.address}`,
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
