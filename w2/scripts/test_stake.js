// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const {ethers} = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const [account] = await ethers.getSigners();
    const masterChef = await ethers.getContractAt("MasterChef", "0x18CB31EeA243eC4A31e51b95625513Fe6aBBACDa", account);
    const myToken = await ethers.getContractAt("MyToken", "0xf40daa37a7e36b421f60c74c387660c57cb51590", account);
    const myTokenTx = await myToken.approve("0x18CB31EeA243eC4A31e51b95625513Fe6aBBACDa", "10000000000000000000000000000000000");

    // wait until the transaction is mined
    await myTokenTx.wait();

    console.log("授权成功")

    const masterChefTx = await masterChef.deposit(0, ethers.utils.parseEther('10'));
    await masterChefTx.wait();
    console.log("质押成功")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
