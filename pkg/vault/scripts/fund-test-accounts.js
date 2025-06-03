const { ethers } = require('hardhat');

(async () => {
  const [richAccount, ...accountsToFund] = await ethers.getSigners();

  for (let acc of accountsToFund) {
    const tx = await richAccount.sendTransaction({
      to: acc.address,
      value: 1000000000000000000n,
    });
    const rc = await tx.wait();
    console.log(`sent funds to ${acc.address}, `, rc);
  }
  console.log("DONE");
})();