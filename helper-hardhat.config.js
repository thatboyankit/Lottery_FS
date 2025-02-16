const { ethers } = require("hardhat")

const networkConfig = {
    11155111: {
        name: "Sapoila",
        vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
        entryFee: ethers.util.parseEthers("0.3"),
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        subscriptionId: "something",
        gasLimit: "2,500,000"
    },
    31337: {
        name: "localhost",
        entryFee: ethers.util.parseEthers("3"),
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        gasLimit: "2,500,000"
    }
}

const devChains = ["hardhat", "localHost", "ganache"]

module.exports = {
    networkConfig,
    devChains
}