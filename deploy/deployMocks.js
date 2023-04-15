module.exports = async function ({getNamedAccounts, deployments}) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const { network, ethers } = require("hardhat") 
    const { devchains } = require("../helper-hardhat.config")
    const networkName = network.name
    const BaseFee = ethers.utils.parseEther("0.25")
    const Gas_Price_Link = 1e9

    if(devchains.includes(networkName)) {

        log("DevChain detected>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        const VRFMock = await deploy("VRFCoordinatorV2Mock.sol", {
            from: deployer,
            args: [BaseFee, Gas_Price_Link],
            log: true
        })
        log(VRFMock.address + ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        log("MocksDeployed>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    }

}

module.exports.tags = ["mocks", "all"]