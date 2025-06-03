# Running tests
1) `yarn`
2) `yarn workspace @balancer-labs/balancer-js build`
3) `yarn build`
4) Default network is configured to `boojumOS` node at `http://localhost:3050`. Change to `geth` if you want to run tests against `geth` or `reth` node.
5) Make sure you have your node running.
6) Make sure you have enough funds on account `0xa61464658AfeAf65CccaaFD3a512b69A83B77618` (PK: ` 0xac1e735be8536c6534bb4f17f06f6afc73b2b5ba84ac2cfb12f7461b20c0bbe3`).
7) Make sure rate limits are disabled on your node.
8) `cd pkg/vault`.
9) `npm run test:prepare`.
10) Swap tests: `npm run test -- test/Swaps.test.ts`.
11) Asset management tests: `npm run test -- test/AssetManagement.test.ts`

# Reproducing UND_ERR_SOCKET error when tx value is greater than account balance
1) Complete steps 1-8.
2) `npm run deploy-weth`.
