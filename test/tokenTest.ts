import { expect } from "chai";
import { ethers } from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import { MyToken } from "../typechain-types";
import {BigNumber} from "ethers";


let deployer: SignerWithAddress
let user1: SignerWithAddress
let user2: SignerWithAddress
let Token
let token: MyToken
let decimals: BigNumber
decimals = BigNumber.from(10).pow(18)
describe("Token testing", async()=>{
    before(async()=>{
        [deployer, user1,user2] = await ethers.getSigners()
        Token = await ethers.getContractFactory("MyToken")
        token = await Token.deploy()
        await token.deployed()
    })
    describe("Token Initialise", async()=>{
       
        it("Deployed", async()=>{})
        it("Should to be correct owner", async()=>{
            expect(await token.owner()).equal(deployer.address)
        })
        it("User balances equal 0", async()=>{
            expect(await token.balanceOf(deployer.address)).deep.equal(0)
            expect(await token.balanceOf(user1.address)).deep.equal(0)
            expect(await token.balanceOf(user2.address)).deep.equal(0)
        })
    })
    describe("Basic operations", async()=>{
        before(async()=>{
            [deployer, user1,user2] = await ethers.getSigners()
            Token = await ethers.getContractFactory("MyToken")
            token = await Token.deploy()
            await token.deployed()
        })
        it("Should to be mintable by owner", async()=>{
            await token.mint(user1.address, decimals.mul(100))
            await token.mint(deployer.address, decimals.mul(1000))
            expect(await token.balanceOf(user1.address)).equals(decimals.mul(100))
            expect(await token.balanceOf(deployer.address)).equals(decimals.mul(1000))
        })
        it("Should to can be transfered", async()=>{
            await expect(() => token.transfer(user1.address, 100))
                .to.changeTokenBalances(token, [deployer.address, user1.address], [-100, 100]);
            await expect(() => token.connect(user1).transfer(user2.address, 100))
                .to.changeTokenBalances(token, [ user1.address, user2.address], [-100, 100]);
            await expect(() => token.connect(user2).transfer(deployer.address, 100))
                .to.changeTokenBalances(token, [ user2.address, deployer.address], [-100, 100]);  
        })
        
    })
    describe("Check 1000 tokens limit by account", async()=>{
        it("Cant be minted if limit reaches", async()=>{
            await expect(token.mint(user1.address, decimals.mul(1001))).to.be.revertedWith('More 1000 tokens on address after transaction')
        })
        it("Cant be transfered if limit reaches", async()=>{
            let balanceOwner = await token.balanceOf(deployer.address)
            let balanceUser1 = await token.balanceOf(user1.address)
            expect((balanceOwner.add(balanceUser1)).gt(decimals.mul(1000)))
            await expect(token.transfer(user1.address, decimals.mul(1001))).to.be.revertedWith('More 1000 tokens on address after transaction')
        })
    })
})
