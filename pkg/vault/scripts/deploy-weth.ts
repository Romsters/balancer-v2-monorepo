import deployer from '../../../pvt/helpers/src/models/tokens/TokensDeployer';

(async () => {
  const contract = await deployer.deployToken({
    symbol: "WETH"
  });
  console.log(contract.address);
  const depositTx = await contract.instance.deposit({ value: "999999389999999900000100000000000000000000000000000000000000000" });
  await depositTx.wait();

  console.log("DONE");
})();

