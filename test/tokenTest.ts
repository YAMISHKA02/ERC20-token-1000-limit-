import {expect} from "chai";
import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {VelGeekToken, VelGeekToken__factory} from "../typechain-types";
import {BigNumber} from "ethers";


let deployer: SignerWithAddress
let user1: SignerWithAddress
let user2: SignerWithAddress
let tokenFactory: VelGeekToken__factory
let token: VelGeekToken
const decimals = BigNumber.from(10).pow(18)
const supply = 100000

describe("Token testing", async () => {
    before(async () => {
        [deployer, user1, user2] = await ethers.getSigners()
        tokenFactory = await ethers.getContractFactory("VelGeekToken")
        token = await tokenFactory.deploy()
        await token.deployed()
    })
    describe("Token Initialise", async () => {

        it("Deployed", async () => {
            // todo check deployment
        })

        it("Should be correct owner", async () => {
            expect(await token.owner()).equal(deployer.address)
        })

        it("Owner balance equal 100000 tokens", async () => {
            expect(await token.balanceOf(deployer.address)).deep.equal(decimals.mul(supply))
            expect(await token.balanceOf(user1.address)).deep.equal(0)
            expect(await token.balanceOf(user2.address)).deep.equal(0)
        })
    })

    describe("Basic operations", async () => {
        before(async () => {
            [deployer, user1, user2] = await ethers.getSigners()
            tokenFactory = await ethers.getContractFactory("VelGeekToken")
            token = await tokenFactory.deploy()
            await token.deployed()
        })
        it("Should be transferable without limits for owner", async () => {
            await expect(token.transfer(user1.address, decimals.mul(100000)))
                .to.changeTokenBalances(token, [deployer.address, user1.address],
                    [decimals.mul(-100000), decimals.mul(100000)])

        })
        it("Should be transferable by users if is fits limits", async () => {
            await expect(token.connect(user1).transfer(user2.address, decimals.mul(1000)))
                .to.changeTokenBalances(token, [user1.address, user2.address], [decimals.mul(-1000), decimals.mul(1000)])
        })
    })

    describe("Check 1000 tokens limit by account", async () => {
        it("Can't be transferred if limit reaches", async () => {
            // fixme
            let balanceOwner = await token.balanceOf(deployer.address)
            let balanceUser1 = await token.balanceOf(user1.address)
            let allBalance = balanceOwner.add(balanceUser1)
            expect(allBalance).gt(decimals.mul(1000))
            await expect(token.transfer(user1.address, allBalance))
                .to.be.revertedWith('More 1000 tokens on address after transaction')
        })
    })
})
