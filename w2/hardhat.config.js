require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const proxyUrl = 'http://127.0.0.1:7890';   // change to yours, With the global proxy enabled, change the proxyUrl to your own proxy link. The port may be different for each client.
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent(proxyUrl);
setGlobalDispatcher(proxyAgent);

const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || '';
const PRI = process.env.PRIVATE_KEY01 || "";

module.exports = {
  //部署网络
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/ab0d04a15308481eb828d56fa0889917`,
      accounts: [`0x${PRI}`],
      chainId: 5
    },
    bsctest: {
      url: `https://data-seed-prebsc-1-s3.binance.org:8545/`,
      accounts: [`0x${PRI}`],
      chainId: 97
    },
    okextest: {
      url: `https://exchaintestrpc.okex.org`,
      accounts: [`0x${PRI}`],
      gasPrice:5000000000,
      chainId: 65
    },
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
  solidity: {
    // 编译版本
    compilers: [
      {
        version: "0.6.12",
        settings: {}
      },
    ]
  },
  //编译以后的文件路径
  paths: {
    // 合约来源
    sources: "./contracts",
    // 测试文件
    tests: "./test",
    // 缓存目录
    cache: "./cache",
    // 编译目录
    artifacts: "./artifacts"
  }
};
