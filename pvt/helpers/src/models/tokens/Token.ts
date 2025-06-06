import { BigNumber, Contract, ContractTransaction } from 'ethers';

import { MAX_UINT256 } from '../../constants';
import { BigNumberish } from '../../numbers';

import TokensDeployer from './TokensDeployer';
import TypesConverter from '../types/TypesConverter';
import { Account, TxParams } from '../types/types';
import { RawTokenDeployment } from './types';
import { deployedAt } from '../../contract';

export default class Token {
  name: string;
  symbol: string;
  decimals: number;
  instance: Contract;

  static async create(params: RawTokenDeployment): Promise<Token> {
    return TokensDeployer.deployToken(params);
  }

  static async deployedAt(address: Account): Promise<Token> {
    const instance = await deployedAt('v2-solidity-utils/TestToken', TypesConverter.toAddress(address));
    const [name, symbol, decimals] = await Promise.all([instance.name(), instance.symbol(), instance.decimals()]);
    if (symbol === 'WETH') {
      return new Token(
        name,
        symbol,
        decimals,
        await deployedAt('v2-standalone-utils/TestWETH', TypesConverter.toAddress(address))
      );
    }
    return new Token(name, symbol, decimals, instance);
  }

  constructor(name: string, symbol: string, decimals: number, instance: Contract) {
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
    this.instance = instance;
  }

  get address(): string {
    return this.instance.address;
  }

  async balanceOf(account: Account): Promise<BigNumber> {
    return this.instance.balanceOf(TypesConverter.toAddress(account));
  }

  async mint(to: Account, amount?: BigNumberish, { from }: TxParams = {}): Promise<void> {
    const token = from ? this.instance.connect(from) : this.instance;

    if (this.symbol === 'WETH') {
      console.log(`Depositing ${amount?.toString()} WETH...`);
      const depositTx = await token.deposit({ value: amount });
      await depositTx.wait();
      console.log("Transferring WETH...")
      await (await token.transfer(TypesConverter.toAddress(to), amount)).wait();
      console.log("Transferred WETH")
    } else if (this.symbol !== 'wstETH' && this.symbol != 'wampl') {
      // wstETH and wampl need permissioned calls (wrap() in the case of wstETH); calling it
      // generically from init() would fail. So tests that mint these tokens (e.g.,
      // UnbuttonAaveLinearPool) need to do it separately, and we need to add these exceptions
      // here, so that mint() is a no-op for these tokens.
      await (await token.mint(TypesConverter.toAddress(to), amount ?? MAX_UINT256)).wait();
    }
  }

  async transfer(to: Account, amount: BigNumberish, { from }: TxParams = {}): Promise<ContractTransaction> {
    const token = from ? this.instance.connect(from) : this.instance;
    return (await token.transfer(TypesConverter.toAddress(to), amount)).wait();
  }

  async approve(to: Account, amount?: BigNumberish, { from }: TxParams = {}): Promise<ContractTransaction> {
    const token = from ? this.instance.connect(from) : this.instance;
    return (await token.approve(TypesConverter.toAddress(to), amount ?? MAX_UINT256)).wait();
  }

  async burn(amount: BigNumberish, { from }: TxParams = {}): Promise<ContractTransaction> {
    const token = from ? this.instance.connect(from) : this.instance;
    return (await token.burn(amount)).wait();
  }

  compare(anotherToken: Token): number {
    return this.address.toLowerCase() > anotherToken.address.toLowerCase() ? 1 : -1;
  }
}
