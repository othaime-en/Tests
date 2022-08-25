const { network, ethers} = require("hardhat");
const { DECIMALS, INITIAL_PRICE } = require("../helper-hardhat-config");

module.exports.default=async({ getNamedAccounts, deployments })=>{

    const chainIds = network.config.chainId;

    if (chainIds == 31337) {
        console.log("Local network detected! Deploying mocks...");

        // const deployer = (await ethers.getSigners())[0];


        // const instance=await ethers.getContractFactory("MockV3Aggregator");

        // const contracts= await instance.deploy(DECIMALS, INITIAL_PRICE);

        // console.log(`Mock Address: ${contracts.address}`);

        const { deploy, log } = deployments;
        const { deployer } = await getNamedAccounts();

        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
    }

    console.log("Mocks Deployed!")
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("You are deploying to a local network, you'll need a local network running to interact")
    console.log(
        "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
    )
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")



}
module.exports.tags = ["all", "mocks", "main"];