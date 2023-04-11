import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"

const deploy: DeployFunction = async()=>{
  const Token = await ethers.getContractFactory("MyContract");
  const token = await Token.deploy();
  await token.deployed();
  console.log("MyContract deployed to:", token.address);
}
