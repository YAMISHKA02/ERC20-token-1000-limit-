import { expect } from "chai";
import { ethers } from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import { VeelGeekERC20 } from "../typechain-types";
import {BigNumber} from "ethers";


let deployer: SignerWithAddress
let user1: SignerWithAddress
let user2: SignerWithAddress
let Token
let token: VeelGeekERC20
let decimals: BigNumber
let allowance = 100000
decimals = BigNumber.from(10).pow(18)
describe("Token testing", async()=>{
    before(async()=>{
        [deployer, user1,user2] = await ethers.getSigners()
        Token = await ethers.getContractFactory("VeelGeekERC20")
        token = await Token.deploy()
        await token.deployed()
    })
    describe("Token Initialise", async()=>{
       
        it("Deployed", async()=>{})
        it("Should to be correct owner", async()=>{
            expect(await token.owner()).equal(deployer.address)
        })
        it("Owner balance equal 100000 tokens", async()=>{
            expect(await token.balanceOf(deployer.address)).deep.equal(decimals.mul(allowance))
            expect(await token.balanceOf(user1.address)).deep.equal(0)
            expect(await token.balanceOf(user2.address)).deep.equal(0)
        })
    })
    describe("Basic operations", async()=>{
        before(async()=>{
            [deployer, user1,user2] = await ethers.getSigners()
            Token = await ethers.getContractFactory("VeelGeekERC20")
            token = await Token.deploy()
            await token.deployed()
        })
        it("Should to can be transfered", async()=>{
            await expect(() => token.transfer(user1.address, 100000))
                .to.changeTokenBalances(token, [deployer.address, user1.address], [-100000, 100000]);
            
        })
        
    })
    describe("Check 1000 tokens limit by account", async()=>{
        it("Cant be transfered if limit reaches", async()=>{
            let balanceOwner = await token.balanceOf(deployer.address)
            let balanceUser1 = await token.balanceOf(user1.address)
            let allBalance = balanceOwner.add(balanceUser1)
            expect(allBalance).gt(decimals.mul(1000))
            await expect(token.transfer(user1.address, allBalance)).to.be.revertedWith('More 1000 tokens on address after transaction')
        })
    })
})
