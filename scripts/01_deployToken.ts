import {ethers} from "hardhat";
const deployToken = async() => {
    const [deployer] = await ethers.getSigners()
    console.log("Deploing with that account:", deployer.address)
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const tokenFactory = await ethers.getContractFactory("VelGeekToken")
    const token = await tokenFactory.deploy()
    console.log("Token address:", token.address);
}
deployToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });