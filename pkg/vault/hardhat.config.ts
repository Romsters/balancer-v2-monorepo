import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-ignore-warnings';

import { hardhatBaseConfig } from '@balancer-labs/v2-common';
import { name } from './package.json';

import { task } from 'hardhat/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import overrideQueryFunctions from '@balancer-labs/v2-helpers/plugins/overrideQueryFunctions';

task(TASK_COMPILE).setAction(overrideQueryFunctions);

export default {
  mocha: {
    timeout: 300000, // timeout in milliseconds (here 300 seconds)
  },
  solidity: {
    compilers: hardhatBaseConfig.compilers,
    overrides: { ...hardhatBaseConfig.overrides(name) },
  },
  warnings: hardhatBaseConfig.warnings,
  defaultNetwork: 'boojumos',
  networks: {
    geth: {
			gas: 12e6,
			blockGasLimit: 12e6,
      gasPrice: 25_000_000_000, // 25 gwei
			/*allowUnlimitedContractSize: true,*/
			url: 'http://localhost:8545',
			accounts: [
				"0xac1e735be8536c6534bb4f17f06f6afc73b2b5ba84ac2cfb12f7461b20c0bbe3",
				"0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110",
				"0xd293c684d884d56f8d6abd64fc76757d3664904e309a0645baf8522ab6366d9e",
				"0x850683b40d4a740aa6e745f889a6fdc8327be76e122f5aba645a5b02d0248db8",
				"0x3d3cbc973389cb26f657686445bcc75662b415b656078503592ac8c1abb8810e",
				"0x509ca2e9e6acf0ba086477910950125e698d4ea70fa6f63e000c5a22bda9361c",
			],
		},
    boojumos: {
			gas: 12e6,
			blockGasLimit: 12e6,
      gasPrice: 25_000_000_000, // 25 gwei
			url: 'http://localhost:3050',
			accounts: [
				"0xac1e735be8536c6534bb4f17f06f6afc73b2b5ba84ac2cfb12f7461b20c0bbe3",
				"0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110",
				"0xd293c684d884d56f8d6abd64fc76757d3664904e309a0645baf8522ab6366d9e",
				"0x850683b40d4a740aa6e745f889a6fdc8327be76e122f5aba645a5b02d0248db8",
				"0x3d3cbc973389cb26f657686445bcc75662b415b656078503592ac8c1abb8810e",
				"0x509ca2e9e6acf0ba086477910950125e698d4ea70fa6f63e000c5a22bda9361c",
			],
		},
  }
};
