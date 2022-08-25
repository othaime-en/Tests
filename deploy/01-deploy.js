const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const fs = require("fs")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainIds = network.config.chainId
    let ethUsdPriceFeedAddress;

    if(chainIds==31337){
        const aggregator=await ethers.getContract("MockV3Aggregator");
        ethUsdPriceFeedAddress=aggregator.address;
    }else{
        ethUsdPriceFeedAddress="0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
    }

    const lowSvg= await fs.readFileSync("./images/frown.svg", {encoding: "utf-8"});
    const highSvg= await fs.readFileSync("./images/happy.svg", {encoding: "utf-8"});

    const args=[ethUsdPriceFeedAddress, lowSvg, highSvg];

    log("Deploying the 01 script___________________");

    const dynamicNft= await deploy("dynamicNFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1
    })
}
module.exports.tags = ["all", "dynamicsvg", "main"]