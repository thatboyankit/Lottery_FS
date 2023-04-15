module.exports = async function ({getNamedAccounts, deployments}) {

    const { devChains, networkConfig } = require("../helper-hardhat.config")
    const { deploy, log } = deployments
    const { deployer } = await ethers.getNamedAccounts()
    const { network, ethers } = require("hardhat")
    const chainId = network.config.chainId
    let VRFCoordinatorV2Address, subscriptionId
    const entryFee = networkConfig[chainId]["entryFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const gasLimit = networkConfig[chainId]["gasLimit"]
    const interval = 30
    const subamt = ethers.utils.parseEther("3")


    if(devChains.includes(network.name)) {
        const vrfc = ethers.getContract("VRFCoordinatorV2Mock")
        VRFCoordinatorV2Address = vrfc.address
        const trxresponse = vrfc.createSubscription()
        const receipt = trxresponse.wait(1)
        subscriptionId = receipt.events[0].args.subId
        await vrfc.fundSubscription(subscriptionId, subamt)
    
    } else {
        VRFCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }

    const arguments = [
        VRFCoordinatorV2Address,
        entryFee,
        gaslane, 
        subscriptionId,
        gasLimit,
        interval
    ]
    
    log("Deploying Lottery>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    const lottery = await deploy("Lottery", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfermations: network.config.blockConfirmations || 1
    })

    log("Lottry deployed>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

}

module.exports.tags = ["main", "all"]